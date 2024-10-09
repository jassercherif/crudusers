pipeline {
    agent any

    tools {
        nodejs 'NODE' 
    }

    stages {
        

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Lint Frontend Code') {
            steps {
                dir('client') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('server') {
                    sh 'npm run test '
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
