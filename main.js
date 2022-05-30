// トピックの配列
const topics = ['javascript', 'python', 'aws', 'typescript', 'react',
                'flutter', 'docker', 'nextjs', 'go', 'ios', 'github',
                'rails', 'php', 'nodejs', 'swift', 'linux', 'ruby',
                'android', 'laravel', 'rust', 'firebase', 'unity',
                'git', 'vuejs', 'css', 'dart', 'vscode', 'githubactions',
                'csharp', 'macos', 'gcp', 'java', 'html', 'html5',
                'windows', 'shopify', 'kubernetes', 'web', 'ポエム',
                '機械学習', 'kotlin', 'azure', 'graphql', 'mysql', 'api',
                'メモ', 'ubuntu', 'cpp', 'wailwindcss', 'test', 'terraform',
                'lambda', '個人開発', 'vim', 'atcoder', 'switftui', 'xcode',
                'raspberrypi', 'sql', 'nuxtjs', 'npm'
]

$(() => {
  /**
   * フィードを保持する配列
   * @type {RssFeed[]}
   */
  const feeds = []

  // 監視オブジェクトを作成
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 表示された場合はRSSをロードして監視対象外とする
        const elm = entry.target
        const jElm = $(elm)
        const topicNo = jElm.attr('data-topic-no')

        // RssFeedのロードを呼び出す
        feeds[topicNo].load()

        // 監視の対象から外す
        observer.unobserve(elm)
      }
    })
  })

  // 記事を保持するルート要素
  const jContentRoot = $('.content-root')

  // トピック分RSS記事を作成する
  topics.forEach((topic, topicNo) => {
    const url = `https://zenn.dev/topics/${topic}/feed`
    const feed = new RssFeed(topic, url)
  
    const jFeedTag = feed.createTag()
    jFeedTag.appendTo(jContentRoot)

    // 番号で逆引きできるように属性に配列番号を記録
    jFeedTag.attr('data-topic-no', topicNo)

    // フィードを格納しておく
    feeds.push(feed)

    // 監視対象へ
    observer.observe(jFeedTag[0])
  })
})
