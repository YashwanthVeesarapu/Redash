pipeline {
    agent any

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = credentials('REDASH_FIREBASE_TOKEN')
        
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out..'
                git branch: 'main', 
                    credentialsId: 'bfc88f96-eb1e-4df4-99cb-66f945cc956a', 
                    url: 'https://github.com/YashwanthVeesarapu/Redash.git' 
                }
            }
        stage('Build') {
            steps {
                script {
                    echo 'Installing..'
                    sh 'npm install'
                }
                script {
                    echo 'Building..'
                    sh 'npm run build'
                }
      
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Installing Firebase..'
                    sh 'npm install firebase-tools'
                }
                script {
                    echo 'Deploying..'
                    sh 'firebase deploy --only hosting'
                }
            }
         
        }
    }
}