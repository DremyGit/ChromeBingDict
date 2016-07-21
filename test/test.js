import { expect } from 'chai';
import  {
  parseDescription,
  isPhrase,
  parsePhrase,
  unique
} from '../app/scripts/search';


describe('Common.js', () => {
  describe('parseDescription()', () => {
    it('works well', () => {
      var html = '<meta name="description" content="test" />';
      expect(parseDescription(html)).to.equal('test');
    })
  });

  describe('isPhrase()', () => {
    it('is true', () => {
      var description = '必应词典为您提供test的释义，美[test]，英[test]，v. 试验；测试；检测；测验； n. 试验；检测；考试；测验； 网络释义： 检验；考验；睾酮(testosterone)； ';
      expect(isPhrase(description)).to.be.true;
    });
    it('is false', () => {
      var description = '词典';
      expect(isPhrase(description)).to.be.false;
    })
  });

  describe('parsePhrase()', () => {
    it('works well in English to Chinese', () => {
      var info = '必应词典为您提供test的释义，美[test]，英[test]，v. 试验；测试；检测；测验； n. 试验；检测；考试；测验； 网络释义： 检验；考验；睾酮(testosterone)； ';
      var phrase = parsePhrase(info);
      expect(Object.keys(phrase).length).to.equal(4);
      expect(phrase.v.length).to.equal(4);
      expect(phrase['网络释义'].length).to.equal(3);
      expect(phrase['网络释义'][1]).to.equal('考验');
      expect(phrase.result.length).to.equal(8);
    });
    it('works well in Chinese to English', () => {
      var info = '必应词典为您提供词语的释义，拼音[cí yǔ]，na. words and expressions; terms； 网络释义： Ordet; Words; The Words； ';
      var phrase = parsePhrase(info);
      expect(Object.keys(phrase).length).to.equal(3);
      expect(phrase['na'].length).to.equal(2);
      expect(phrase['网络释义'].length).to.equal(3);
      expect(phrase['网络释义'][2]).to.equal('The Words');
      expect(phrase.result.length).to.equal(5);
    })
  });

  describe('unique()', () => {
    it('works well', () => {
      var arr = ['a', 'b', 'c', 'c', 'b'];
      expect(unique(arr)).to.deep.equal(['a', 'b', 'c']);
    })
  })
});