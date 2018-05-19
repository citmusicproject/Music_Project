var playlist = require('./playlist');

describe('Add song to playlist', () => {
    test('Succesfully added to playlist', () => {
        function callback(something, data) {
            expect(data.img).toEqual([]);
            expect(data.links).toEqual([]);
            expect(data.title).toEqual([]);
        }

        playlist.add_to_play_list({ id: 'dtojzg5j', vid: 'YQHsXMglC9A', video_name: 'Hello-Adele' }, callback);
    });
});

describe('Check if the song is in the playlist', () => {
    test('Cant add the same song', () => {
        function callback(something, data) {
            expect(vid).toEqual([]);
            expect(id).toEqual([]);
        }

        playlist.get_song_list('ck7g5ug8', callback);
    });
});

describe('Delete song to playlist', () => {
    test('Succesfully deleted song from to playlist', () => {
        var info = { id: 'dtojzg5j', vid: 'YQHsXMglC9A', video_name: 'Hello-Adele' };
        expect(() => {
            playlist.remove_from_list(info);
        }).not.toThrow();
    });
});
