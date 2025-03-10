# Smart Event Platform Backend

這是一個使用 FastAPI 開發的後端專案，旨在提供智慧事件平台的後端服務。目前專案使用 Python 3.13，並透過虛擬環境管理依賴。

## 環境需求

- **Python**: 3.13.2（透過 Homebrew 安裝）
- **依賴管理**: FastAPI, Uvicorn
- **作業系統**: macOS（測試於 Apple Silicon 環境）

## 專案結構

```bash
.
├── main.py # 主程式
├── requirements.txt # 依賴列表
├── .env # 環境變量
└── README.md # 專案說明
```

## 安裝步驟

1. 克隆專案：

```bash
git clone https://github.com/yourusername/smart-event-platform-backend.git
cd smart-event-platform-backend
```

2. 建立虛擬環境：

```bash
python3 -m venv venv
source venv/bin/activate # 在 macOS/Linux 上
.\venv\Scripts\activate # 在 Windows 上
```

3. 安裝依賴：

```bash
pip install -r requirements.txt
```

4. 啟動開發伺服器：

```bash
uvicorn main:app --reload
```

5. 訪問 API：

```bash
curl http://localhost:8000
```

## 部署

1. 設定環境變量：

```bash
cp .env.example .env
```

2. 部署到雲端平台：

```bash
    # 使用 Docker 部署
    docker build -t smart-event-platform-backend .
    docker run -d -p 8000:8000 smart-event-platform-backend
```

3. 設定 CI/CD 流程：

```bash
    # 使用 GitHub Actions 部署
    # 在 .github/workflows/ 目錄下建立 deploy.yml 檔案
    # 內容如下：
    name: Deploy to Cloud Platform
    on:
      push:
        branches:
          - main
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout code
            uses: actions/checkout@v3
          - name: Set up Docker
            uses: docker/setup-buildx-action@v2
          - name: Build Docker image
            run: docker build -t smart-event-platform-backend .
          - name: Push Docker image
            run: docker push your-docker-hub-username/smart-event-platform-backend:latest
```
