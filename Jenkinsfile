pipeline {
    agent any

    // 环境变量
    environment {
        APP_NAME    = 'demo-app'
        APP_VERSION = "1.0.${BUILD_NUMBER}"
        NODE_ENV    = 'production'
        DEPLOY_DIR  = 'D:\\deploy\\demo-app'
    }

    // 流水线选项
    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    // 构建触发器（可选）：每天凌晨 2 点自动触发
    triggers {
        cron('H 2 * * *')
    }

    // 参数化构建
    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['dev', 'test', 'prod'], description: '选择部署环境')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: '是否跳过测试')
    }

    stages {
        stage('检出代码') {
            steps {
                echo "==> 开始检出代码，构建号：${BUILD_NUMBER}"
                checkout scm
            }
        }

        stage('安装依赖') {
            steps {
                echo '==> 安装项目依赖'
                bat 'npm install'
            }
        }

        stage('代码检查') {
            steps {
                echo '==> 执行代码静态检查 (Lint)'
                bat 'npm run lint'
            }
        }

        stage('运行测试') {
            when {
                expression { return !params.SKIP_TESTS }
            }
            steps {
                echo '==> 执行单元测试'
                bat 'npm test'
            }
            post {
                always {
                    echo '测试结果已生成'
                }
            }
        }

        stage('构建产物') {
            steps {
                echo "==> 开始构建 ${APP_NAME} v${APP_VERSION}"
                bat 'npm run build'
            }
        }

        stage('归档产物') {
            steps {
                echo '==> 归档构建产物'
                archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true
            }
        }

        stage('部署') {
            steps {
                echo "==> 部署到 ${params.DEPLOY_ENV} 环境"
                script {
                    if (params.DEPLOY_ENV == 'prod') {
                        input message: '确认部署到生产环境？', ok: '确认部署'
                    }
                    bat """
                        if not exist "${DEPLOY_DIR}" mkdir "${DEPLOY_DIR}"
                        xcopy /E /Y /I dist "${DEPLOY_DIR}"
                    """
                }
            }
        }
    }

    // 构建后操作
    post {
        success {
            echo "构建成功 - ${APP_NAME} v${APP_VERSION}"
        }
        failure {
            echo "构建失败，请检查日志"
        }
        always {
            echo '清理工作空间'
            cleanWs()
        }
    }
}
