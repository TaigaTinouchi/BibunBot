# 微分bot


## 関連URL
>- [Github](https://github.com/TaigaTinouchi/Bibun-bot)
>- [基本チャート(LINE Bot を AWSを使ってシステム構築してみた。)](https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c)  
>- [LINE Developers](https://developers.line.biz/console/channel/1655537453/roles)  
>- [課題共有ss](https://docs.google.com/spreadsheets/d/1AtQ1Wharz8B4jLhwhzF1eSXRPA9MRjjBHujilBjL37Q/edit?ts=5ff29f39#gid=0)  
>- [webhook URL](
https://nqkoz84f5f.execute-api.ap-northeast-1.amazonaws.com/line_webhook/receiver)
>- [jsonのエンコード,デコードについて](https://techplay.jp/column/611)
>- [AWSアカウントを取得したら速攻でやっておくべき初期設定まとめ](https://qiita.com/tmknom/items/303db2d1d928db720888#iamパスワードポリシーの適用)

## 仕様
ラインでチャットされた関数に対し、その関数の微分を返信するチャットbotを作成する。  
> 多変数関数に対する対応（偏微分、全微分の実装）  
> 等、具体的な仕様に関しては要検討

---
## フローチャート

>実装目標は微分botだが、インフラがないと微分をするシステムを開発しても意味がないことから、まずインフラを整えることを目標に  
[基本チャート(LINE Bot を AWSを使ってシステム構築してみた。)](https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c)  
を参考にオウム返し(parrot)のチャットbotを実装する。  
その後(もしくは同時進行で)微分のシステムを開発し上記のオウム返しチャットbotに組み込むことで微分botの完成とする。

### AWSアカウント作成

AWSアカウント作成後、初期設定を行う  
[AWSアカウントを取得したら速攻でやっておくべき初期設定まとめ](https://qiita.com/tmknom/items/303db2d1d928db720888#iamパスワードポリシーの適用)  
を参考にした。また、セキュリティ設定がメインでキャッシング設定は特にしていない


### オウム返しチャットbot作成
視覚的なチャートは以下  
![フローチャート](https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F1cb323bd58181a5ec13419d0d707ea32.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&s=b971b39ea820ad75424eb67c4c2bd09e"チャート")
(https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c より)

> lambda関数を用いたDynamoDBへのItemのputが正常に動かなかった  

VPCに紐付けされていないlambda関数を作成したところ、正常に動作したことから
- VPC設定  
- lambda関数のVPCの紐付け
- etc  

のいずれかに問題があることがわかった。
そこで、また新しくVPC設定を１からやり直し、lambdaの挙動を確認する。

---

## タスク管理
### 木内
>- タスク管理
>- AWSアカウント初期設定
>- 期末レポート
>- ダイエット

### 竹内
>- lambda,DynamoDB調査、環境構築、実装

### 未振り分け
>- 実際に微分を行うシステム開発
---
## 学習内容まとめ

### JSON形式について
> 参考サイト:[jsonのエンコード,デコードについて](https://techplay.jp/column/611)  

JSO：JavaScript Object Notation (Notation：表記)  

> #### （予備知識）jsにおけるオブジェクトとは  
(参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Basics)
~~~JavaScript
const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
//const:定義後に変更できない
~~~
>- プロパティ(JSONでいうKey)に対するvalueは配列、int or float値、str型、関数を用いることができる   
>- push,deleteなど作成後に様々なメソッドで操作可能


> #### JSONとオブジェクト  
> js内でオブジェクトとして扱うことができる（実際には単なるテキストデータ）  
>~~~JavaScript
// object
var object = { name: "Ronald", number: 7, nation: "Portugal" };
// JSON
var json = { "name": "Ronald", "number": 7, "nation": "Portugal" };
>~~~
> **！注！ 上記の状態ではまだJSONではない(テキストデータ化されているためオブジェクトである)**
> 'json'というオブジェクトを**エンコード**することで'json'というJSON形式のデータにする
~~~JavaScript
console.log(JSON.stringify(json));
~~~
> とするとエンコードされJSONになった（str型になった）'json'がログに出力される
~~~
$ { "name": "Ronald", "number": 7, "nation": "Portugal" }
~~~
> この状態にすることでオブジェクトというjs特有のデータ（オブジェクト）としてではなく単なるテキストとしてデータをサーバー間などで送受信することができる。
> このようにして、JSON形式でデータを送受信している。  
> これまでは、JSONファイルの送信側のJSONファイルの扱いについての説明  
> 受信側では？？  
>  -> 与えられたJSONファイル（エンコード済）をオブジェクトとして**デコード**することで扱えるようにする
~~~JavaScript
console.log(JSON.parse(json));
~~~
> とするとデコードされオブジェクト化した'json'がログに出力される
~~~
$ { name: "Ronald", number: 7, nation: "Portugal" }
~~~
> プロパティ(JSONでいうKey)部分のダブルクォーテーションマークが外れて、オブジェクトになっていることが確認できる。
---

### IPアドレス
> 参考サイト： https://wa3.i-3-i.info/index.html より

**IP：Internet Protocol**  
プロトコルの一種

> **Protocol**  
> 1.外交儀礼、儀典、礼儀作法、慣習  
> 2.条約議定書、協約、協定、議定書
> 3.手順、手続き、指令、命令
> 4.〔コンピューターの〕通信接続手順、通信規約◆コンピューター間でデータを送受信するためのルール［決まり事］

通信プロトコル一覧

| 名前 | 概要 |
| :---: | :---: |
| [IP](https://wa3.i-3-i.info/word1807.html) | インターネット通信に関するプロトコル</br>(Internet Protocol) |
| [FTP](https://wa3.i-3-i.info/word1137.html) | ファイルの受け渡しに関するプロトコル</br>(File Transfer Protocol) |
| [SMTP](https://wa3.i-3-i.info/word14.html) | メールを送信する際に用いるプロトコル</br>(Simple Mail Transfer Protocol) |
| [POP](https://wa3.i-3-i.info/word12686.html) | メールサーバからメール（のコピー）を持ってきて読むプロトコル</br>(Post Office Protocol) |
| [IMAP](https://wa3.i-3-i.info/word1136.html) | メールサーバ上でメールを読む際に用いるプロトコル</br>(Internet Message Access Protocol) |
| [HTTP](https://wa3.i-3-i.info/word165.html) | ホームページを見る際に用いるプロトコル</br>(Hyper Text Transfer Protocol)|
| [TCP](https://wa3.i-3-i.info/word19.html) | 安全性に重点を置いた通信に用いられるプロトコル</br>(Transmission Control Protocol) |
| [UDP](https://wa3.i-3-i.info/word110.html) | 通信速度を重点を置いた通信に用いられるプロトコル</br>(User Datagram Protocol) |
| [NTP](https://wa3.i-3-i.info/word12071.html) | ネットワーク経由で時刻を合わせる際に用いられるプロトコル</br>(Netwok Time Protocol) |
| [PPP](https://wa3.i-3-i.info/word12021.html) | 2点間で仮想的に専用の経路を確立し、データを送受信するための通信プロトコル</br>(Point to Point Protocol) |

なんかIPについてじゃなくてプロトコルのまとめになっちゃったけどまあいいか。
