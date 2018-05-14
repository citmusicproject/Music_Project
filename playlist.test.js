var playlist = require('./playlist')

describe('Create New Playlist', () => {
    test('create', () => {
      expect(playlist.create_play_list("play list 1")).toBe("play list 1")
    })
  })

describe('Get Playlist', () => {
   test('get playlist name', () => {
      function callback(something, data) {
       expect(data).not.toBeNull();
        expect(data).toBeDefined();
      }
     expect(playlist.get_play_list(3,callback))
   })
 })

 describe('Get songs', () => {
   test('get song name', () => {
     expect(playlist.get_song_list("play list 1")).toBe("play list 1")
   })
 })

 describe('Add song', ()=>{
   test('add songs to playlist',()=>{
    expect(playlist.add_to_play_list("play list 1")).toBe("play list 1")
   })
 })