# 🚗 Vip Auto World 完整部署指南

## 📋 目录
1. [前置准备](#前置准备)
2. [Supabase 配置](#supabase-配置)
3. [本地开发](#本地开发)
4. [部署到 Vercel](#部署到-vercel)
5. [常见问题](#常见问题)

---

## 前置准备

### 需要的账户和工具

✅ GitHub 账户（已有）  
✅ [Supabase](https://supabase.com) - 免费注册  
✅ [Vercel](https://vercel.com) - 免费注册  
✅ Node.js 18+ - [下载](https://nodejs.org)  
✅ npm 或 yarn  

---

## Supabase 配置

### Step 1: 创建 Supabase 项目

1. 访问 https://supabase.com
2. 点击 "Sign In" → "Create an account"
3. 使用 GitHub 账户登录或注册
4. 点击 "New Project"
5. 填写项目信息：
   - Project name: `vip-auto-world`
   - Database password: 设置强密码（自动生成）
   - Region: 选择离你最近的区域
6. 点击 "Create new project"（等待 5-10 分钟）

### Step 2: 获取 API 凭证

1. 项目创建完成后，点击左侧 "Settings" → "API"
2. 复制以下信息：
   ```
   Project URL: https://xxxxxxxxxxxx.supabase.co
   anon public key: eyJxxxxxxxxxxxx...
   ```

3. 保存这两个值，稍后需要用到

### Step 3: 创建数据库表

1. 在 Supabase 中，点击左侧 "SQL Editor"
2. 点击 "New Query"
3. 复制 `scripts/setup-database.sql` 中的所有 SQL 代码
4. 粘贴到查询编辑器中
5. 点击 "Run" 执行

✅ 表格创建成功！

### Step 4: 创建存储 Bucket

1. 点击左侧 "Storage"
2. 点击 "Create a new bucket"
3. Bucket name: `vehicle-photos`
4. 勾选 "Private bucket"
5. 点击 "Create bucket"

✅ 存储配置完成！

---

## 本地开发

### Step 1: 克隆项目

```bash
git clone https://github.com/vipautoworld1-hub/vip-auto-world.git
cd vip-auto-world
```

### Step 2: 安装依赖

```bash
npm install
```

### Step 3: 配置环境变量

1. 复制 `.env.local.example` 为 `.env.local`

```bash
cp .env.local.example .env.local
```

2. 编辑 `.env.local`，填入 Supabase 凭证：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxx...
```

### Step 4: 启动开发服务器

```bash
npm run dev
```

打开浏览器访问：http://localhost:3000

🎉 恭喜！本地开发环境运行成功！

---

## 部署到 Vercel

### Step 1: 部署项目

1. 访问 https://vercel.com
2. 使用 GitHub 账户登录
3. 点击 "Add New" → "Project"
4. 搜索并选择 `vip-auto-world` 仓库
5. 点击 "Import"

### Step 2: 配置环境变量

1. 在 "Environment Variables" 中添加：

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxxxxxxxxxxx...
```

2. 点击 "Deploy"

### Step 3: 等待部署完成

Vercel 会自动：
- 从 GitHub 拉取代码
- 安装依赖
- 构建项目
- 部署到全球 CDN

部署完成后，您会获得一个 URL：
```
https://vip-auto-world.vercel.app
```

✅ 部署完成！

---

## 常见问题

### Q: "Missing Supabase credentials" 错误

**A:** 检查 `.env.local` 文件中的环境变量是否正确填写。确保没有多余的空格。

### Q: 图片上传失败

**A:** 
1. 检查 Supabase Storage bucket 是否创建
2. 确保 bucket 权限设置正确
3. 检查图片文件大小（建议 < 5MB）

### Q: 表格显示"暂无数据"

**A:**
1. 检查数据库表是否创建成功
2. 访问 Supabase SQL Editor 验证表结构
3. 尝试重新创建表

### Q: Vercel 部署失败

**A:**
1. 检查 GitHub 仓库是否为公开
2. 确认环境变量在 Vercel 中配置无误
3. 查看 Vercel 的 Build Log 获取详细错误信息

---

## 🆓 成本总览

| 服务 | 免费额度 | 足够用 |
|------|--------|--------|
| GitHub | ∞ 私有仓库 | ✅ |
| Vercel | 100GB/月 | ✅ |
| Supabase DB | 500MB | ✅ (支持 ~10K 条记录) |
| Supabase Storage | 1GB | ✅ (支持 ~500 张照片) |
| **总成本** | **¥0** | **✅** |

---

**祝您使用愉快！🚗✨**
