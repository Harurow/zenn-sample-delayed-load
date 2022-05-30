/**
 * RSSフィードの要素 LOVE-G RSS-Readerの簡易版
 * https://chrome.google.com/webstore/detail/love-g-rss-reader2/docpnbbbkcjpicndjcndadmnfgnhoicc?hl=ja
 */
class RssFeed {
  constructor(topic, url) {
    /**
     * トピック
     * @type {string}
     */
    this.topic = topic;

    /**
     * RSSフィードのURL
     * @type {string}
     */
    this.url = url;

    /**
     * タグ/jQueryオブジェクト
     * @type {jQuery}
     */
    this.jTag = undefined;
  }

  /**
   * フィードのタグを構築する
   * DOMには接続していない
   * @return {jQuery}
   */
  createTag() {
    const jTag = $(`
      <li class="feed noload">
        <div class="header">
          <a class="title" target="_blank" rel="noopener" href="${this.url}">${this.topic} rss feed xml</a>
        </div>
        <div class="line-indeterminate-root">
          <span class="line-indeterminate-bar bar1"></span>
          <span class="line-indeterminate-bar bar2"></span>
        </div>
        <div class="items-root">
          <ul class="items">
          </ul>
        </div>
      </li>
    `);
    this.jTag = jTag;
    return jTag;
  }

  load() {
    this.jTag.removeClass('noload');
    this.jTag.addClass('loading');

    // 本来はajaxでRSSの記事を取得しにいくがCORSで取得できないので
    // 3秒後取得できたことにする
    setTimeout(() => {
      this.jTag.removeClass('loading');
      const jItems = this.jTag.find('.items');
      jItems.empty();
      const item = $(`
        <li class="feed-item">
        </li>
      `);
      item.text('読み込めた記事がここに載る');
      item.appendTo(jItems);
      }, 3000)
  }
}
