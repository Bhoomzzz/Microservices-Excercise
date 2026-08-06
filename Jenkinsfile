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
        IMAGE_TAG = "${env.BUILD_NUMBER}"
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
                                    sh "docker build -t product-service:${IMAGE_TAG} ."
                                } else {
                                    bat "docker build -t product-service:${IMAGE_TAG} ."
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
                                    sh "docker build -t cart-service:${IMAGE_TAG} ."
                                } else {
                                    bat "docker build -t cart-service:${IMAGE_TAG} ."
                                }
                            }
                        }
                    }
                }
            }
        }
        // AWS/ECR and Kubernetes deployment removed for local CI runs
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
