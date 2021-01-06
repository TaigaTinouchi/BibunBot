# 微分bot


## 関連URL
>- [Github](https://github.com/TaigaTinouchi/Bibun-bot)
>- [基本チャート(LINE Bot を AWSを使ってシステム構築してみた。)](https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c)  
>- [LINE Developers](https://developers.line.biz/console/channel/1655537453/roles)  
>- [課題共有ss](https://docs.google.com/spreadsheets/d/1AtQ1Wharz8B4jLhwhzF1eSXRPA9MRjjBHujilBjL37Q/edit?ts=5ff29f39#gid=0)  

## 仕様
ラインでチャットされた関数に対し、その関数の微分を返信するチャットbotを作成する。  
> 多変数関数に対する対応（偏微分、全微分の実装）  
> 等、具体的な仕様に関しては要検討


## フローチャート

>実装目標は微分botだが、インフラがないと微分をするシステムを開発しても意味がないことから、まずインフラを整えることを目標に  
[基本チャート(LINE Bot を AWSを使ってシステム構築してみた。)](https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c)  
を参考にオウム返しのチャットbotを実装する。  
その後(もしくは同時進行で)微分のシステムを開発し上記のオウム返しチャットbotに組み込むことで微分botの完成とする。

### オウム返しチャットbot作成
視覚的なチャートは以下  
![フローチャート](https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F1cb323bd58181a5ec13419d0d707ea32.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&s=b971b39ea820ad75424eb67c4c2bd09e"チャート")
(https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c より)


## タスク管理
### 木内
>- タスク管理
>- API gateway 調査、実装
>- 期末レポート
>- ダイエット

### 竹内
>- lambda,DynamoDB調査、環境構築、実装

### 未振り分け
>- webhook 調査、実装
>- 実際に微分を行うシステム開発
