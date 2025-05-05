# Prisma Docker PostgreSQL Starter

[![Docker](https://img.shields.io/badge/Docker-20.10%2B-blue)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker%20Compose-v2-blue)](https://docs.docker.com/compose/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7-orange)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)

Docker、Docker Compose、Prisma、PostgreSQLを使用して開発環境を構築するためのスターターリポジトリです。

## 機能

- 🐳 **Docker & Docker Compose v2**: コンテナ化された開発環境
- 🐘 **PostgreSQL**: 強力なリレーショナルデータベース
- 🔄 **Prisma ORM**: TypeScript向けの次世代ORM
- 📊 **サンプルモデル**: User/Post関連を持つ基本的なデータモデル
- 🌱 **シードデータ**: 開発用の初期データ投入スクリプト
- 🔧 **TypeScript**: 静的型付けによる開発体験の向上

## クイックスタート

```bash
# リポジトリのクローン
git clone https://github.com/ssssswooooo/prisma-docker-postgres-starter.git
cd prisma-docker-postgres-starter

# Dockerコンテナのビルドと起動
docker compose up -d --build

# Prisma Clientの生成
docker compose exec app npm run prisma:generate

# データベースマイグレーションの実行
docker compose exec app npm run prisma:migrate-dev -- --name init

# シードデータの投入
docker compose exec app npm run prisma:seed

# データベースへの接続（確認用）
npm run psql
```

## プロジェクト構成

```
.
├── Dockerfile             # アプリケーションコンテナの定義
├── compose.yaml           # Dockerサービス設定
├── package.json           # Node.js設定・依存関係
├── tsconfig.json          # TypeScript設定
├── .env                   # 環境変数
├── .dockerignore          # Dockerビルド除外ファイル
├── .gitignore             # Git除外ファイル
└── src/                   # ソースコード
    ├── index.ts           # アプリケーションエントリーポイント
    └── prisma/            # Prisma関連ファイル
        ├── schema.prisma  # データモデル定義
        └── seed.ts        # シードデータスクリプト
```

## データモデル

このスターターには以下のデータモデルが含まれています：

- **User**: ユーザー情報（名前、メールアドレスなど）
- **Post**: 投稿（タイトル、コンテンツ、公開状態など）
  - 各投稿はユーザーに関連付けられています（1対多の関係）

## 使用方法

### Prismaマイグレーション

新しいマイグレーションを作成するには：

```bash
docker compose exec app npm run prisma:migrate-dev -- --name your_migration_name
```

### データベースリセット

データベースをリセットし、マイグレーションとシードを再適用するには：

```bash
docker compose exec app npx prisma migrate reset --force --schema ./src/prisma/schema.prisma
```

### Prisma Studioの起動

Prismaの管理UIを使用してデータを視覚的に操作するには：

```bash
docker compose exec app npx prisma studio --schema ./src/prisma/schema.prisma
```

その後、ブラウザで `http://localhost:5555` にアクセスします。

## 開発

### アプリケーションの開発

アプリケーションを開発するには、`src/index.ts`を編集してください。

開発モードで実行：

```bash
docker compose exec app npm run dev
```

ビルドして実行：

```bash
docker compose exec app npm run build
docker compose exec app npm start
```

### PostgreSQLへの直接アクセス

PostgreSQLに直接接続してSQLクエリを実行するには：

```bash
npm run psql
```
