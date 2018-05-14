var create_play_list = require("./playlist")
var get_play_list = require("./playlist")
var get_song_list = require("./playlist")
var add_to_play_list = require("./playlist")

describe('Create New Playlist', () => {
    test('create', () => {
      expect(create_play_list("play list 1")).toBe("play list 1")
    })
  })

describe('Get Playlist', () => {
   test('get playlist name', () => {
     expect(get_play_list("1")).toBe("play list 1")
   })
 })

 describe('Get songs', () => {
   test('get song name', () => {
     expect(get_song_list("play list 1")).toBe("hello")
   })
 })

 describe('add songs', () => {
  test('add song name', () => {
    expect(add_to_play_list("song")).toContain("song")
  })
})