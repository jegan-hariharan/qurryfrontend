pipeline { 
    environment { 
        registry = "jegansanthosh/newrepo" 
        registryCredential = 'Dockerhub_jegan' 
       
    }
    agent any 
    stages { 
        stage('Building our image') { 
            steps { 
                  
        
                sh 'docker build --network host -t qurryfront:$BUILD_NUMBER .'
                sh 'docker tag qurryfront:$BUILD_NUMBER jegansanthosh/newrepo:$BUILD_NUMBER'
            } 
        }
        stage('push our image') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        sh 'docker push jegansanthosh/newrepo:$BUILD_NUMBER' 
                    }
                } 
            }
        }   
    }
}
