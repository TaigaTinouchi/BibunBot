# 微分bot
BotベーシックID:@138auyzh
## 開発状況
**仮完成**  


入力に関してちんちん  
例えば  
x^4sin(x)を微分したい場合、  
x^4 sin x  
と送信する。  
出力は画像データとして　　
![出力結果](/Docks/outputExa.jpg)  
となる。

実際の様子↓
![画像](/Docks/IMG_3580.PNG)



| バグ | 概要 | 結果 |
| :---: | :---: | :---: |
|加法演算子を乗法演算子と認識してしまうバグ|WolframAplphaに送信している演算子はlambdaInのコンソールログから加法演算子"+"の送信を確認できたが、WolframAlpha側では "×"と認識される。WolframAlphaの仕様を確認する必要あり。また、"+"の代わりに"plus"と入力すればバグが生じないことが確認できた| 配列要素をplusに変換することで解決 |
|同じ入力でもlambdaInがエラーを吐く時と吐かない時がある|[エラー]^1(ERROR Uncaught Exception)LINEからのmessage取得は確認。http://api.wolframalpha.com/v2/query?appid=XXXXXX-XXXXXXXXXXX&input=derivative%20of%20sin%20x&output=json　ログにより上記のURLにgetしていることがわかった。(正常) エラコードからperseがうまく行っていないことがわかった同じ入力内容でもエラーになったりならなかったりする。ログから、WolframAlphaの応答が同じ入力に対し変化があることがわかった。エラーがある場合、送信されるJSONが完結していない状態で送られるためparseの際にエラーが生じる。要ドキュメント参照。JSONはDocs/responceOfwolframAlpha.json|未解決|

[エラー]^1
~~~
{
    "errorType": "SyntaxError",
    "errorMessage": "Unexpected end of JSON input",
    "stack": [
        "SyntaxError: Unexpected end of JSON input",
        "    at JSON.parse (<anonymous>)",
        "    at IncomingMessage.<anonymous> (/var/task/lambdaIn.js:32:20)",
        "    at IncomingMessage.emit (events.js:326:22)",
        "    at IncomingMessage.EventEmitter.emit (domain.js:483:12)",
        "    at IncomingMessage.Readable.read (_stream_readable.js:507:10)",
        "    at flow (_stream_readable.js:1007:34)",
        "    at resume_ (_stream_readable.js:988:3)",
        "    at processTicksAndRejections (internal/process/task_queues.js:84:21)"
    ]
}
~~~

## ライブラリ
### README
仕様、スペック、参考サイト、フローチャート、タスク管理
### Docks
雑多
### parrot
オウム返し関連
- ToDynamoDB
>DynamoDBを呼び出すlambda関数
- conslod
> 単にコンソールにログを表示するlambda関数
- test_lambda.js
>テスト用lambda関数

### CD.md
開発環境設定

### main
- lambdaIn.js
> LINEAPIのwebhookURLからjsonデータを受け取り、処理決定する。WolframAlphaのAPIを用い導関数のデータ取得及びDynamoDB呼び出しまで行う
> 開発状況：完成


- lambdaOut.js
> DynamoDBをトリガーに導関数と入力をLINEのreplyURLに返す
> 開発状況:完成


## 関連URL
>- [Github](https://github.com/TaigaTinouchi/Bibun-bot)
>- [基本チャート(LINE Bot を AWSを使ってシステム構築してみた。)](https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c)  
>- [LINE Developers](https://developers.line.biz/console/channel/1655537453/roles)
>- [LINE MessagikngAPI Developers](https://developers.line.biz/ja/docs/messaging-api/overview/)  
>- [課題共有ss](https://docs.google.com/spreadsheets/d/1AtQ1Wharz8B4jLhwhzF1eSXRPA9MRjjBHujilBjL37Q/edit?ts=5ff29f39#gid=0)  
>- webhook URL(非公開)
>- [jsonのエンコード,デコードについて](https://techplay.jp/column/611)
>- [AWSアカウントを取得したら速攻でやっておくべき初期設定まとめ](https://qiita.com/tmknom/items/303db2d1d928db720888#iamパスワードポリシーの適用)
>- [Wolfram|Alpha API ドキュメント](https://products.wolframalpha.com/api/documentation/#xml-result-elements)
>- [Wolfram|Alpha API リファレンス](https://products.wolframalpha.com/docs/WolframAlpha-API-Reference.pdf)
>- wolframalpha appID(非公開)
>- [XMLとは？IT初心者にもわかりやすい基礎知識とHTMLとの違い](https://hnavi.co.jp/knowledge/blog/xml/)
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
![フローチャート](/Docks/chartImage.png)
(https://qiita.com/hiyuzawa/items/10e7bf2f6ad5d1c7fc9c より)

> lambda関数を用いたDynamoDBへのItemのputが正常に動かなかった(解決済み)  

VPCに紐付けされていないlambda関数を作成したところ、正常に動作したことから
- VPC設定  
- lambda関数のVPCの紐付け
- etc  

のいずれかに問題があることがわかった。
そこで、また新しくVPC設定を１からやり直し、lambdaの挙動を確認する。

>- ケチってNATgatewayを切っていたこと  
>- VPCの環境設定をprivateとpublicで分けていたこと  
に問題あり修正によりオウム返しbot完成


### 微分システム構築

今後の拡張性を考えて構築する。可能であればFourier級数展開などの微分以外の実装もしたい。->lambdaInを挟む  
ここでは3つの関数を用意する。(lambdaIn,lmbdaMain,lambdaOut)

**lambdaIn**
>- LINEのmessage型を判定text以外の型はこの関数内で処理し直接ラインの返信をする(実装済み)
>- message型がtextの場合の処理を行い、入力された数式に間違えがないかを確認する
(入力をTEX形式で要求するか、Wolfram |Alpha APIを使う。後者の場合、微分をそのままAPIを用いた方がいい気もする。)
>- 数式に要求的な間違いがない場合、lambdaMainを呼び出す。  

微分システムが完成するまではWolfram|Alpha APIを呼び出す。

---
**lambdaMain**
>- lambdaInにより呼び出される。
>- 引数はLINEにより入力された数式
>- 入力された数式の導関数と入力された数式をDynamoDBに送る


微分システムが完成するまではWolfram|Alpha APIからのJSONを利用する。

---
**lambdaOut**
>- DynamoDBに書き込みが生じた際に呼び出す。
>- 導関数を返信する。また入力の確認として入力された数式をTEX出力として画像送信したい。

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

---
### XMLについて
Wolfram|Alphaのドキュメントを見ると、応答がXML形式であることからXMLについて学ぶ必要があると感じたためまとめる(JSON型で受け取れることがわかったので、XMLは使用しない)
サイト[XMLとは？IT初心者にもわかりやすい基礎知識とHTMLとの違い](https://hnavi.co.jp/knowledge/blog/xml/)を参考に学んでいく。

**XML : Extensible Markup Language**  
HTMLと構造は近いが目的が違う  
HTML -> フロントエンドに利用。人間がデータを見る際にわかりやすいように構成する。  
XML -> データをコンピュータ間で検索しやすいように構成する。プロトコル的な扱い方？  

Wolfram|Alpha におけるタグ一覧は[Wolfram|Alpha API ドキュメント](https://products.wolframalpha.com/api/documentation/#xml-result-elements)のList of XML Result Elementsに記載されている。
