pipeline {
    agent any

    tools {
        jdk 'JDK25'
        maven 'Maven3'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Services') {
            parallel {
                stage('Build Product Service') {
                    steps {
                        script {
                            runMaven('product-service', 'clean package')
                        }
                    }
                }
                stage('Build Cart Service') {
                    steps {
                        script {
                            runMaven('cart-service', 'clean package')
                        }
                    }
                }
            }
        }

        stage('Build Exercises') {
            parallel {
                stage('Build Excercise') {
                    steps {
                        script {
                            runMaven('Excercise', 'clean package')
                        }
                    }
                }
                stage('Build Excercise 1') {
                    steps {
                        script {
                            runMaven('Excercise 1', 'clean package')
                        }
                    }
                }
                stage('Build Excercise 3') {
                    steps {
                        script {
                            runMaven('Excercise3', 'clean package')
                        }
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true, allowEmptyArchive: true
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deployment step: add your deploy commands here'
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