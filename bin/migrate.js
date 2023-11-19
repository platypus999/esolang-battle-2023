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

	for (const id of ['sitositositoo', 'u6606u5e03', 'n4o847', 'hideo54', 'kuromunori', 'ishitatsuyuki', 'hakatashi', 'syobon_hinata', 'platypus999']) {
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
			start: new Date('2023-11-15T00:00:00+0900'),
			end: new Date('2023-11-19T06:00:00+0900'),
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
			start: new Date('2023-11-14T11:03:00+0900'),
			end: new Date('2023-11-14T12:48:00+0900'),
			description: {
				ja: stripIndent`
				\`\`\`x\`\`\` と \`\`\`+\`\`\` からなる長さ $$N$$ の文字列で、 $$x^2$$ で割り切れる多項式と解釈できるものが $$T$$ 個改行区切りで入力されます。
				
				## 多項式と解釈するとは
				
				文字列に対応する多項式 $$f$$ を以下のように構成します。
				
				- 初め、 $$f = 0$$ で、変数 $$c$$ を $$c=0$$ とします。
				- 左から $$1$$ 文字ずつ以下の操作を行います。
					- もし今の文字が \`\`\`x\`\`\` ならば $$c$$ に $$1$$ を足します。
					- もし今の文字が \`\`\`+\`\`\` ならば $$f$$ に $$x^c$$ を足し、 $$c=0$$ とします。
				- もし $$c \\geq 1$$ ならば $$f$$ に $$x^c$$ を足します。
				
				この結果得られる $$f$$ が文字列に対応する多項式です。
				
				
				それぞれの式を $$x$$ で微分した多項式を、 \`\`\`x\`\`\` と \`\`\`+\`\`\` からなる文字列で表現したものを改行区切りで出力しなさい。出力された文字列は上のように解釈して採点されます。入力は必ず"整理" (大きい次数の項から順番に記述) されていますが，出力は"整理"されていなくてもかまいません．出力における \`\`\`x\`\`\` と \`\`\`+\`\`\` および改行文字 (文字コード 0x0a) 以外の文字は採点の際無視されます．
				
				# 制約
				
				- $$T = 50$$
				- $$N = 20$$
				
				# 入力
				
				入力は以下の形式で標準入力から与えられる。
				
				\`\`\`
				$$S_1$$
				$$\\vdots$$
				$$S_T$$
				\`\`\`
				
				# 出力
				
				問題文に従って出力してください。ここで、各文字列の長さは $$5000$$ 文字以下である必要があります。
				
				# 入力例
				
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
				
				
				# 出力例
				
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
				`,
				en: '',
			},
		},
		{upsert: true},
	);

	mongoose.connection.close();
})();
