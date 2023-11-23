const {stripIndent} = require('common-tags');
const mongoose = require('mongoose');
const docker = require('../engines/docker');
const Contest = require('../models/Contest');
const Language = require('../models/Language');
const Submission = require('../models/Submission');
const User = require('../models/User');

mongoose.Promise = global.Promise;

(async () => {
	await mongoose.connect('mongodb://localhost:27017/esolang-battle');

	await User.updateMany({admin: true}, {$set: {admin: false}});

	for (const id of ['sitositositoo', 'u6606u5e03', 'n4o847', 'hideo54', 'kuromunori', 'ishitatsuyuki', 'hakatashi', 'syobon_hinata', 'platypus999', 'caphosra', 'fabon-f', 'Mitsubachi-coder', 'kom-bu']) {
		const user = await User.findOne({email: `${id}@twitter.com`});
		if (user) {
			user.admin = true;
			await user.save();
		}
	}

	await Contest.updateOne(
		{id: 'komabasai2023-practice'},
		{
			name: '駒場祭2023 Practice Contest',
			id: 'komabasai2023-practice',
			start: new Date('2023-11-22T00:00:00+0900'),
			end: new Date('2023-11-24T11:00:00+0900'),
			description: {
				ja: stripIndent`
				\`\`\`
				大文字か小文字かを判定せよ。
				\`\`\`
				## 入力
				* ラテン文字 A から Z の 26 文字が順番に、一行で与えられる。
				* 各文字は大文字あるいは小文字である。
				* 入力の最後には改行が付与される。
				## 出力
				* 与えられた文字それぞれについて、大文字であれば \`1\` を、小文字であれば \`0\` を出力せよ。
				* 出力された文字列に含まれる空白文字（改行含む）は無視される。
				## 制約
				* 入力には必ず大文字がひとつ以上、小文字がひとつ以上含まれる。
				## 入出力例
				### 入力
				\`\`\`
				ABCdefghiJKLmnopqRSTUvwxYz
				\`\`\`
				### 出力
				\`\`\`
				11100000011100000111100010
				\`\`\`
				`,
				en: '',
			},
		},
		{upsert: true},
	);

	await Contest.updateOne(
		{id: 'komabasai2023'},
		{
			name: '[TSG LIVE! 11] Live CodeGolf Contest',
			id: 'komabasai2023',
			start: new Date('2023-11-24T11:03:00+0900'),
			end: new Date('2023-11-24T12:48:00+0900'),
			description: {
				ja: stripIndent`
\`\`\`
多項式を微分せよ！
\`\`\`

# 詳細

\`x\`と\`+\`のみからなり、\`+\`が連続せず、\`x\`で始まり\`x\`で終わる文字列のことを「多項式風文字列」と呼ぶことにします。

多項式風文字列を、以下のルールで多項式とみなします。

- \`x\`が$n$個並んだだけの多項式風文字列は、多項式（単項式）$x^n$とみなします。
- \`+\`を$m$個含む多項式風文字列は、\`+\`によって$m+1$個に区切ることができるので、まず区切られたそれぞれの部分を単項式とみなし、元の文字列は、それらの和として得られる多項式とみなします。

例えば多項式風文字列\`xxx\`は多項式$x^3$とみなし、多項式風文字列\`xxxxx+xx\`は多項式$x^5 + x^2$とみなします。

それぞれ多項式$f_1(x), \\dots, f_T(x)$とみなされる、長さ $N$ の多項式風文字列 $T$ 個が、改行区切りで入力されます。$f_1(x), \\dots, f_T(x)$はいずれも$x^2$で割り切れます。

各$i=1,\\dots,T$に対し、 $f_i(x)$ を $x$ で微分した多項式 $f_i'(x)$ とみなされる多項式風文字列をひとつずつ（つまり全部で$T$個の多項式風文字列を）、順に改行区切りで出力しなさい。入力は必ず「整理」（定義は後述）されていますが、出力は「整理」されていなくてもかまいません。**出力における\`x\`と\`+\`および改行文字（文字コード 0x0a）以外の文字は採点の際無視されます。**

「整理」の定義：多項式風文字列が整理されているとは、その多項式風文字列を\`+\`によって区切って、区切られた各部分をもともと左にあった順に見ていくとき、その長さが単調非増加であることをいいます。例えば\`xxx+xxx+xx\`や\`x\`は整理されていますが、\`x+xxxx\`や\`xx+x+xx\`は整理されていません。

# 制約

- $T = 50$
- $N = 20$

# 入力

入力は $T = 50$ 行与えられます。
$i$ 行目には、\`x\` と \`+\` で構成される $N = 20$ 文字の文字列 $S_i$ が与えられます。
また、各行（最終行も含む）の末尾には改行文字が存在します。

### 入力形式

---

$S_1$

$\\vdots$

$S_T$

---

# 出力

出力は $T = 50$ 行である必要があります。
$i$ 行目には $S_i$ に対応する多項式 $f_i$ を微分し、それに対応する文字列 $S(f_i')$ を出力してください。
原則、行の末尾には改行文字を出力する必要がありますが、最終行のみ末尾に改行文字があってもなくても構いません。
なお、**出力における \`x\` と \`+\` および改行文字以外の文字は無視されます**が、一行の長さは $5000$ 文字以下である必要があります。


# 入出力例

## 入力例1

\`\`\`
xxx
xxxxx+xx
xx+xx
\`\`\`

## 出力例1

\`\`\`
xx+xx+xx
xxxx+x+x+xxxx+xxxx+xxxx
xtsg+x2023+xlive+xgolf
\`\`\`

入力例の $S \\left( f \\right)$ に対応する $f \\left( x \\right)$ はそれぞれ $x^3, x^4+x^2, 2x^2$ です。よって、これを $x$ で微分したものはそれぞれ $3x^2, 4x^3+2x, 4x$ です。

実際、出力例の $S \\left( f \\right)$ に対応する $f \\left( x \\right)$ はそれぞれ $3x^2, 4x^3+2x, 4x$ になっており、条件を満たします。出力は多項式の次数が多い順に処理しなくても良いこと、出力における \`\`\`x\`\`\` と \`\`\`+\`\`\` および改行文字 (文字コード 0x0a) 以外の文字は採点の際無視されることに気をつけてください。

なお、この入出力例は入出力の説明によるものであり、テストケースの制約を**満たしていない**ことに注意してください。従って、この入力例はジャッジに使われるテストケースに**含まれていません**。

（制約を満たす入力は入力例2を参照してください。）

## 入力例2

\`\`\`
xxxxxx+xxxx+xx+xx+xx
xxxxxxxxxxxx+xxxx+xx
xxxxx+xxxx+xxx+xx+xx
xxxxxxxxxxxxx+xxxxxx
xxxxxx+xxxxxx+xxxxxx
xxxx+xxx+xx+xx+xx+xx
xxxxxxx+xxx+xx+xx+xx
xxxxxxxxxx+xxx+xx+xx
xxxxxxxxx+xxxxxx+xxx
xxxxxx+xxxxx+xxxx+xx
xxxxxxxxxxxxxx+xx+xx
xxxxxxxx+xxxx+xxx+xx
xxxxxxxxxx+xxxxxxxxx
xxxxxxx+xxxxxx+xx+xx
xxxx+xxxx+xxx+xxx+xx
xxxxxxx+xxxx+xxxx+xx
xxxxxxx+xxxxxx+xxxxx
xxxxxxxxx+xxxx+xx+xx
xxxxxxxxxx+xxxxxx+xx
xx+xx+xx+xx+xx+xx+xx
xxxxxxxxxxxxxx+xxxxx
xxxxxx+xxxx+xxxx+xxx
xxxxxxxx+xxxxxxxx+xx
xxxxx+xxxx+xxxx+xxxx
xxxx+xxxx+xxxx+xx+xx
xxxxx+xxxxx+xxxxx+xx
xxxxx+xxx+xxx+xxx+xx
xxxxxxxxxxxxxxxxx+xx
xxxxxxxx+xx+xx+xx+xx
xxxxxxxxxxx+xxxx+xxx
xxxxxx+xxxxx+xxx+xxx
xxxxxxxxxxxx+xxx+xxx
xxxxxxxxxxxxxxxxxxxx
xxxxxxxx+xxx+xxx+xxx
xxxxxxxxxxx+xx+xx+xx
xxxxxxxx+xxxxxxx+xxx
xxxxx+xx+xx+xx+xx+xx
xxxxxxxx+xxxxx+xxxxx
xxxxxx+xxx+xxx+xx+xx
xxxxxxxxxx+xxxxx+xxx
xxxxxx+xxxxxx+xxx+xx
xxxxxxx+xxxx+xxx+xxx
xxxxxxxxx+xxxxxxx+xx
xxxxxxxxx+xxxxx+xxxx
xxxxxxxxx+xxx+xxx+xx
xxxxxxx+xxxxx+xxx+xx
xxxxx+xxxxx+xx+xx+xx
xxxxxxx+xxxxxxx+xxxx
xxxxxxxxxx+xxxx+xxxx
xxxxxxxx+xxxxxx+xxxx
\`\`\`


## 出力例2

\`\`\`
xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxx+xxx+xxx+xxx+x+x+x+x+x+x
xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxx+xxx+xxx+xxx+x+x
xxxx+xxxx+xxxx+xxxx+xxxx+xxx+xxx+xxx+xxx+xx+xx+xx+x+x+x+x
xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxxxxxxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx
xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx
xxx+xxx+xxx+xxx+xx+xx+xx+x+x+x+x+x+x+x+x
xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xx+xx+xx+x+x+x+x+x+x
xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xx+xx+xx+x+x+x+x
xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xx+xx+xx
xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxx+xxx+xxx+xxx+x+x
xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+x+x+x+x
xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxx+xxx+xxx+xxx+xx+xx+xx+x+x
xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx
xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+x+x+x+x
xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xx+xx+xx+xx+xx+xx+x+x
xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+x+x
xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxx+xxxx+xxxx+xxxx+xxxx
xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxx+xxx+xxx+xxx+x+x+x+x
xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+x+x
x+x+x+x+x+x+x+x+x+x+x+x+x+x
xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxxxxxxxxxxx+xxxx+xxxx+xxxx+xxxx+xxxx
xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xx+xx+xx
xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+x+x
xxxx+xxxx+xxxx+xxxx+xxxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx
xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+x+x+x+x
xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+x+x
xxxx+xxxx+xxxx+xxxx+xxxx+xx+xx+xx+xx+xx+xx+xx+xx+xx+x+x
xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxx+x+x
xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+x+x+x+x+x+x+x+x
xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxx+xxx+xxx+xxx+xx+xx+xx
xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xx+xx+xx+xx+xx+xx
xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xxxxxxxxxxx+xx+xx+xx+xx+xx+xx
xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxxxxxxx
xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xx+xx+xx+xx+xx+xx+xx+xx+xx
xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+xxxxxxxxxx+x+x+x+x+x+x
xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xx+xx+xx
xxxx+xxxx+xxxx+xxxx+xxxx+x+x+x+x+x+x+x+x+x+x
xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx
xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xx+xx+xx+xx+xx+xx+x+x+x+x
xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xx+xx+xx
xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xx+xx+xx+x+x
xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxx+xxx+xxx+xxx+xx+xx+xx+xx+xx+xx
xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+x+x
xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxx+xxx+xxx+xxx
xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xxxxxxxx+xx+xx+xx+xx+xx+xx+x+x
xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xx+xx+xx+x+x
xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+xxxx+x+x+x+x+x+x
xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxxxxx+xxx+xxx+xxx+xxx
xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxxxxxxxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx+xxx
xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxxxx+xxx+xxx+xxx+xxx
\`\`\`

この入出力例は制約を**満たしている**ことに注意してください。従って、この入力例はジャッジに使われるテストケースに**含まれています**。
				`,
				en: '',
			},
		},
		{upsert: true},
	);

	mongoose.connection.close();
})();
