pipeline {
    agent any   // 或 agent any，如果只有 Linux 节点

    environment {
        APP_NAME    = 'demo-app'
        APP_VERSION = "1.0.${BUILD_NUMBER}"
        DEPLOY_DIR  = '/opt/deploy/demo-app'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    triggers {
        cron('H 2 * * *')
    }

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['dev', 'test', 'prod'], description: '选择部署环境')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: '是否跳过测试')
    }

    stages {
        stage('构建产物') {
            steps {
                sh 'chmod +x build.sh && ./build.sh'
            }
        }

        stage('归档产物') {
            steps {
                archiveArtifacts artifacts: 'dist/*.txt', fingerprint: true, allowEmptyArchive: true
            }
        }

        stage('部署') {
            steps {
                script {
                    if (params.DEPLOY_ENV == 'prod') {
                        input message: '确认部署到生产环境？', ok: '确认部署'
                    }
                    sh """
                        mkdir -p "${DEPLOY_DIR}"
                        rsync -a --delete dist/ "${DEPLOY_DIR}/"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "构建成功 - ${APP_NAME} v${APP_VERSION}"
        }
        failure {
            echo "构建失败，请检查日志"
        }
        always {
            cleanWs()
        }
    }
}