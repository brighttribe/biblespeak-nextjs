import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { extractWordsFromXml } from '../import-words.js'

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:wp="http://wordpress.org/export/1.2/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/">
<channel>
<item>
  <title><![CDATA[Aaron]]></title>
  <wp:post_name><![CDATA[aaron-pronunciation]]></wp:post_name>
  <wp:status><![CDATA[publish]]></wp:status>
  <wp:post_type><![CDATA[post]]></wp:post_type>
  <category domain="category" nicename="a"><![CDATA[A]]></category>
  <wp:postmeta>
    <wp:meta_key><![CDATA[mp3_file_name]]></wp:meta_key>
    <wp:meta_value><![CDATA[bbWa1]]></wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key><![CDATA[pronunciation]]></wp:meta_key>
    <wp:meta_value><![CDATA[EHR-uhn]]></wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key><![CDATA[meaning]]></wp:meta_key>
    <wp:meta_value><![CDATA[mountain of strength]]></wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key><![CDATA[easton]]></wp:meta_key>
    <wp:meta_value><![CDATA[<h3>Overview</h3><p>Aaron was Moses' brother.</p>]]></wp:meta_value>
  </wp:postmeta>
</item>
<item>
  <title><![CDATA[Draft Post]]></title>
  <wp:post_name><![CDATA[draft-pronunciation]]></wp:post_name>
  <wp:status><![CDATA[draft]]></wp:status>
  <wp:post_type><![CDATA[post]]></wp:post_type>
</item>
<item>
  <title><![CDATA[A Page]]></title>
  <wp:post_name><![CDATA[some-page]]></wp:post_name>
  <wp:status><![CDATA[publish]]></wp:status>
  <wp:post_type><![CDATA[page]]></wp:post_type>
</item>
</channel>
</rss>`

describe('extractWordsFromXml', () => {
  test('extracts only published posts (not drafts or pages)', async () => {
    const words = await extractWordsFromXml(SAMPLE_XML)
    assert.equal(words.length, 1)
  })

  test('maps WordPress fields to Word shape', async () => {
    const [word] = await extractWordsFromXml(SAMPLE_XML)
    assert.equal(word.title, 'Aaron')
    assert.equal(word.slug, 'aaron-pronunciation')
    assert.equal(word.pronunciation, 'EHR-uhn')
    assert.equal(word.meaning, 'mountain of strength')
    assert.equal(word.audio_file, 'bbWa1')
    assert.equal(word.letter, 'a')
    assert.equal(word.content, '<h3>Overview</h3><p>Aaron was Moses\' brother.</p>')
  })
})
