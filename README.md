# Jenkins 流水线示例项目

一个简单的 Jenkins Pipeline 演示项目，使用 Node.js 编写，包含完整的 CI/CD 流程。

## 项目结构

```
demo/
├── Jenkinsfile          # Jenkins 流水线定义文件
├── package.json         # Node.js 项目配置
├── src/
│   └── app.js           # 示例应用源码
├── test/
│   └── app.test.js      # 单元测试
├── scripts/
│   └── build.js         # 构建脚本
├── .gitignore
└── README.md
```

## 流水线阶段说明

| 阶段 | 说明 |
| --- | --- |
| 检出代码 | 从 SCM (Git) 拉取最新代码 |
| 安装依赖 | 执行 `npm install` |
| 代码检查 | 执行 lint 静态检查 |
| 运行测试 | 执行单元测试（可通过参数跳过） |
| 构建产物 | 生成 `dist/` 目录下的发布物 |
| 归档产物 | Jenkins 归档构建产物 |
| 部署 | 部署到指定环境（生产需手动确认） |

## 流水线特性

- **参数化构建**：可选择部署环境 (`dev` / `test` / `prod`)，可跳过测试
- **环境变量**：统一管理 APP_NAME、APP_VERSION 等配置
- **定时触发**：每天凌晨 2 点自动构建
- **超时控制**：单次构建超过 30 分钟自动中止
- **历史记录**：仅保留最近 10 次构建
- **生产保护**：部署到 `prod` 需人工确认
- **构建通知**：成功/失败均有提示

## 在 Jenkins 中使用

### 1. 前置准备

- Jenkins 已安装并配置代理 (Agent)
- 已安装插件：`Pipeline`、`Git`、`Timestamper`、`Workspace Cleanup`
- Jenkins 节点已安装 Node.js（建议 16+）

### 2. 创建流水线任务

1. Jenkins 首页 → **新建任务**
2. 输入任务名（如 `demo-pipeline`）→ 选择 **流水线 (Pipeline)** → 确定
3. 在配置页拉到 **流水线** 部分：
   - **定义**：选择 `Pipeline script from SCM`
   - **SCM**：Git
   - **仓库地址**：填入你的 Git 仓库 URL
   - **脚本路径**：`Jenkinsfile`
4. 点击 **保存**

### 3. 触发构建

- 手动：点击 **Build with Parameters**，选择环境后构建
- 自动：每天凌晨 2 点自动触发
- Webhook：可在 Git 仓库配置 Webhook 实现 push 自动触发

## 本地测试

```bash
npm install
npm run lint
npm test
npm run build
npm start
```

应用启动后访问 <http://localhost:3000> 可以看到欢迎信息。

## 自定义建议

- 替换 `bat` 为 `sh` 以适配 Linux Jenkins Agent
- 把 `npm test` 输出改为 JUnit XML 格式后，使用 `junit` 步骤展示测试报告
- 增加 Docker 构建/推送阶段
- 接入 SonarQube 做代码质量分析
- 增加钉钉 / 企业微信 / 邮件通知
