# Cloudflare 一言 API Worker

这是一个简单的 Cloudflare Worker 脚本，用于从外部 JSON 数据源获取并随机返回“一言”（引语或短句, 类似 [Hitokoto](https://hitokoto.cn/)）。也可部署为 Cloudflare Page。

## 功能特性

* 从可配置的 JSON URL 获取数据。
* 从 JSON 数组中随机选择一条数据。
* 以 JSON 对象或纯文本（仅 `content` 字段）格式返回所选数据。

## 部署

<div align="center">
<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/illusionlie/cf-yiyan-api"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare"/></a>
</div>

直接使用上方的 Deploy to Cloudflare 按钮，并按下方的步骤配置环境变量。

也可手动部署为 Cloudflare Page:

1. 克隆该仓库为自己的 GitHub 仓库。
2. 前往 [Cloudflare 仪表盘](https://dash.cloudflare.com/)
3. 左侧导航栏 -> 计算(Workers) -> Workers 和 Pages -> 创建 -> Pages -> 连接到 Git, 然后选择你克隆的仓库。

### 环境变量

在创建的 worker 或 Page 项目中, 点击 设置 -> 变量和机密 -> 新建变量

填写变量名称为 `JSON_URL`，变量值为你的 JSON 数据源的 URL。

## 如何使用

部署成功后，Worker 会监听 `/yiyan` 路径上的请求。

* **获取随机一言 (JSON 格式):**
    向 `https://<你的Worker地址>/yiyan` 发送 GET 请求。
    *响应示例:*

    ```json
    {
      "id": 1,
      "content": "这是一条示例引语。",
      "from": "某个来源",
      "author": "某个作者"
    }
    ```

* **获取随机一言 (纯文本格式):**
    向 `https://<你的Worker地址>/yiyan?type=text` 发送 GET 请求。
    *响应示例:*

    ```text
    这是一条示例引语。
    ```

* **其他路径：** 访问任何其他路径将返回 `404 Not Found`。

## JSON 数据格式

Worker 期望从 `JSON_URL` 获取的数据是一个 JSON 对象数组。数组中的每个对象**必须**至少包含一个 `content` 字段。

*可查看示例 `yiyan.template.json`:*

```json
[
    {
        "id": 1,
        "content": "时间不会倒流 已经失去的一切也无法挽回"
    },
    {
        "id": 2,
        "content": "这是一个简单的基于 Cloudflare Pages、Workers 的一言 API",
        "author": "IllusionLie"
    },
    {
        "id": 3,
        "content": "id 和 content 是必须包含的, id 为正整数且不重复, from 和 author 可以选择性包含",
        "from": "https://github.com/illusionlie",
        "author": "IllusionLie"
    }
]
```
