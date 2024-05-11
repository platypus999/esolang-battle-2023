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

	for (const id of ['sitositositoo', 'u6606u5e03', 'n4o847', 'hideo54', 'kuromunori', 'ishitatsuyuki', 'hakatashi', 'syobon_hinata', 'platypus999', 'naan4UGen', 'satos---jp', ]) {
		const user = await User.findOne({email: `${id}@twitter.com`});
		if (user) {
			user.admin = true;
			await user.save();
		}
	}

	await Contest.updateOne(
		{id: 'mayfes2024-practice'},
		{
			name: '五月祭2024 (practice)',
			id: 'mayfes2024-practice',
			start: new Date('2022-11-19T13:03:00+0900'),
			end: new Date('2024-12-31T00:00:00+0900'),
			description: {
				ja: stripIndent`
				\`\`\`
				T 一文字を出力せよ。
				\`\`\`
				## 入力
				* この問題に入力は存在しません。
				## 出力
				* \`T\` という一文字を出力しなさい。ただし、以下の条件を満たす文字列ならば同じく正解文字列とみなす。
				- 英大文字・小文字の区別は付けない。\`t\` も正解文字列として扱われる。
				- 英大文字・小文字以外の文字は全て無視される。例えば \`12T34\` や \`  ^  T     @   \` などは正解文字列として扱われる。
				## 制約
				* 出力に関する制約は存在しない。ただし、ジャッジの AC 判定は以下のルールに従うので注意すること。
				- プログラムが異常終了した場合、それまでに標準出力から出力された文字列を判定にかける。その結果が正解文字列の場合は AC として扱われる。
				- プログラムが時間制限までに実行し終わらなかった場合、TLE として扱われる。たとえそれまでに正解文字列を出力できていたとしても AC にはならない。
				## お知らせ
				WIP (資料を貼る予定)
				### ヒント
				- 練習サーバーのため、すべての言語が提出できるようになっていますが、本番では自分の陣地に隣接している言語のみに提出可能なので注意してください。
				`,
				en: '',
			},
		},
		{upsert: true},
	);

	await Contest.updateOne(
		{id: 'mayfes2024-practice2'},
		{
			name: '五月祭2024 (practice 2)',
			id: 'mayfes2024-practice2',
			start: new Date('2024-05-12T13:33:00+0900'),
			end: new Date('2024-12-31T00:00:00+0900'),
			description: {
				ja: stripIndent`
				\`\`\`
				文字を 100 回繰り返せ！
				\`\`\`
				## 入力
				* 入力は一行与えられる。行には \`A\` から \`Z\` までのいずれかの英大文字が一つ書かれている。
				## 出力
				* 入力で与えられた文字を $100$ 回繰り返したものを出力しなさい。ただし、出力される空白文字は一切無視される。
				* 空白文字は正規表現の \`\\s\` にマッチする任意の文字を指す。（半角スペース、改行などが空白文字に含まれる）
				## 制約
				* ジャッジの AC 判定は以下のルールに従うので注意すること。
				- プログラムが異常終了した場合、それまでに標準出力から出力された文字列を判定にかける。その結果が正解文字列の場合は AC として扱われる。
				- プログラムが時間制限までに実行し終わらなかった場合、TLE として扱われる。たとえそれまでに正解文字列を出力できていたとしても AC にはならない。
				### ヒント
				- 練習サーバーのため、すべての言語が提出できるようになっていますが、本番では自分の陣地に隣接している言語のみに提出可能なので注意してください。
				`,
				en: '',
			},
		},
		{upsert: true},
	);

	await Contest.updateOne(
		{id: 'mayfes2024'},
		{
			name: '[TSG LIVE! 12] Live CodeGolf Contest',
			id: 'mayfes2024',
			start: new Date('2024-05-19T13:03:00+0900'),
			end: new Date('2024-05-19T14:33:00+0900'),
			description: {
				ja: stripIndent`
					本番で使う問題用ですよ
				`,
				en: '',
			},
		},
		{upsert: true},
	);

	mongoose.connection.close();
})();
