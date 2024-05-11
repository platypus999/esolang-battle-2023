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
			name: '五月祭 2024 (practice)',
			id: 'mayfes2024-practice',
			start: new Date('2024-01-01T00:00:00+0900'),
			end: new Date('2024-12-31T00:00:00+0900'),
			description: {
				ja: stripIndent`
				\`\`\`
				T 一文字を出力せよ。
				\`\`\`
				## 入力
				この問題に入力は存在しません。
				## 出力
				\`T\` という一文字を出力しなさい。ただし、以下の条件を満たす文字列ならば同じく正解文字列とみなす。
				* 英大文字・小文字の区別は付けない。（\`t\` も正解文字列として扱われる。）
				* 英大文字・小文字以外の文字は全て無視される。例えば \`12T34\` や \`  ^??T__.__  /@   \` などは正解文字列として扱われる。
				## 制約
				出力に関する制約は存在しない。ただし、ジャッジの AC 判定は以下のルールに従うので注意すること。
				- プログラムが異常終了した場合、それまでに標準出力から出力された文字列を判定にかける。その結果が正解文字列の場合は AC として扱われる。
				- プログラムが時間制限までに実行し終わらなかった場合、TLE として扱われる。たとえそれまでに正解文字列を出力できていたとしても AC にはならない。
				### お知らせ
				- [HackMD](https://hackmd.io/QdHs8RMBSB6PFrf9fXEQcw) に各言語のゴルフに役立つ資料を集めています。
				- 練習サーバーのため、常時すべての言語が提出できるようになっていますが、本番では自分の陣地に隣接している言語のみに提出可能なので注意してください。（初期状態ではどちらのチームも中央行の 6 言語には提出できません。）
				`,
				en: '',
			},
		},
		{upsert: true},
	);

	mongoose.connection.close();
})();
