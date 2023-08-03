pipeline {

    agent any

    tools { nodejs "nodejs" } // NODEJS APPLICATION

    environment {
        DOCKER_CREDENTIALS=credentials('docker-credentials')
    }

    stages {
        stage('Build') { 
            steps {
                echo 'Installing'
                sh 'npm install' 
            }
        }

        stage('Test') {
            steps {
                echo 'Testing'
                sh 'npx hardhat test'
            }
        }

        stage('Linting') {
            steps {
                echo 'Linting'
                sh 'npm run lint'
            }
        }

        stage('Docker build') { 
            steps { 
                echo 'Docker building'
                script{
                    sh "docker build -t marketplace ."
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Docker pushing'
                script{
                     // TO COMPLETE
                }
        }

        stage('Remove Unused Docker Image') {
            steps{
                sh "docker rmi marketplace --force"
            }
        }
        
        stage('Connect To cloud Instance') {
            steps {
               // TO COMPLETE
            }
           

        }

        stage('Restart NGINX'){
            steps{
                // TO COMPLETE
            }

        }
    }
}