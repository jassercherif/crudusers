pipeline {
    agent {
        docker {
            image 'node:18' // Node.js Docker image
        }
    }
    environment {
        MONGO_URL = process.env.MONGO_URI// Example MongoDB URL
    }
    stages {
        stage('Checkout') {
            steps {
                // Clone your code from the Git repository
                git url: 'https://github.com/jassercherif/crudusers', branch: 'master'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    // Install backend dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    // Install frontend dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Lint Backend Code') {
            steps {
                dir('server') {
                    // Lint backend code
                    sh 'npm run lint'
                }
            }
        }

        stage('Lint Frontend Code') {
            steps {
                dir('client') {
                    // Lint frontend code
                    sh 'npm run lint'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('server') {
                    // Run backend tests
                    sh 'npm run test test'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('client') {
                    // Run frontend tests
                    sh 'npm run test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    // Build frontend (React, etc.)
                    sh 'npm run build'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution complete!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
        success {
            echo 'Pipeline executed successfully.'
        }
    }
}
