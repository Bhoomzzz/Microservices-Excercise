pipeline {
    agent any
    tools {
        jdk 'JDK25'
        maven 'Maven3'
    }
    triggers {
        githubPush()
    }
    environment {
        AWS_REGION      = 'us-east-1'
        AWS_ACCOUNT_ID  = '123456789012'
        ECR_REGISTRY    = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        IMAGE_TAG       = "${env.BUILD_NUMBER}"
        AWS_CREDS_ID    = 'aws-ecr-credentials'
        KUBECONFIG_CRED = 'eks-kubeconfig'
        K8S_NAMESPACE   = 'default'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build & Test') {
            parallel {
                stage('Product Service') {
                    steps {
                        script { runMaven('product-service', 'clean verify') }
                    }
                }
                stage('Cart Service') {
                    steps {
                        script { runMaven('cart-service', 'clean verify') }
                    }
                }
            }
        }
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true, allowEmptyArchive: true
            }
        }
        stage('Docker Build') {
            parallel {
                stage('product-service image') {
                    steps {
                        dir('product-service') {
                            script {
                                if (isUnix()) {
                                    sh "docker build -t ${ECR_REGISTRY}/product-service:${IMAGE_TAG} ."
                                } else {
                                    bat "docker build -t ${ECR_REGISTRY}/product-service:${IMAGE_TAG} ."
                                }
                            }
                        }
                    }
                }
                stage('cart-service image') {
                    steps {
                        dir('cart-service') {
                            script {
                                if (isUnix()) {
                                    sh "docker build -t ${ECR_REGISTRY}/cart-service:${IMAGE_TAG} ."
                                } else {
                                    bat "docker build -t ${ECR_REGISTRY}/cart-service:${IMAGE_TAG} ."
                                }
                            }
                        }
                    }
                }
            }
        }
        stage('Push to ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "${AWS_CREDS_ID}"]]) {
                    script {
                        if (isUnix()) {
                            sh """
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                            docker push ${ECR_REGISTRY}/product-service:${IMAGE_TAG}
                            docker push ${ECR_REGISTRY}/cart-service:${IMAGE_TAG}
                            """
                        } else {
                            bat """
                            powershell -NoProfile -Command \"aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}\"
                            docker push ${ECR_REGISTRY}/product-service:${IMAGE_TAG}
                            docker push ${ECR_REGISTRY}/cart-service:${IMAGE_TAG}
                            """
                        }
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            when { branch 'main' }
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KUBECONFIG')]) {
                    script {
                        if (isUnix()) {
                            sh """
                            sed -e 's#<IMAGE>#${ECR_REGISTRY}/product-service:${IMAGE_TAG}#' k8s/product-service-deployment.yaml | kubectl apply -n ${K8S_NAMESPACE} -f -
                            sed -e 's#<IMAGE>#${ECR_REGISTRY}/cart-service:${IMAGE_TAG}#' k8s/cart-service-deployment.yaml | kubectl apply -n ${K8S_NAMESPACE} -f -
                            kubectl rollout status deployment/product-service -n ${K8S_NAMESPACE}
                            kubectl rollout status deployment/cart-service -n ${K8S_NAMESPACE}
                            """
                        } else {
                            bat """
                            powershell -NoProfile -Command \"
                              (Get-Content 'k8s\\product-service-deployment.yaml' -Raw) -replace '<IMAGE>', '${ECR_REGISTRY}/product-service:${IMAGE_TAG}' | Set-Content 'temp-product-service-deployment.yaml';
                              kubectl apply -n ${K8S_NAMESPACE} -f temp-product-service-deployment.yaml;
                              kubectl rollout status deployment/product-service -n ${K8S_NAMESPACE};
                              (Get-Content 'k8s\\cart-service-deployment.yaml' -Raw) -replace '<IMAGE>', '${ECR_REGISTRY}/cart-service:${IMAGE_TAG}' | Set-Content 'temp-cart-service-deployment.yaml';
                              kubectl apply -n ${K8S_NAMESPACE} -f temp-cart-service-deployment.yaml;
                              kubectl rollout status deployment/cart-service -n ${K8S_NAMESPACE};
                            \"
                            """
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            cleanWs(deleteDirs: true, disableDeferredWipeout: true)
        }
    }
}

void runMaven(String projectDir, String goals) {
    dir(projectDir) {
        if (isUnix()) {
            sh "mvn ${goals}"
        } else {
            bat "mvn ${goals}"
        }
    }
}
