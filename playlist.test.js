var playlist = require('./playlist');

test('If song is not in playlist', () => {
    function callback(err,data) {
        expect(data.error).toBe(undefined)
        expect(err).toEqual(undefined)
    }
     playlist.get_song_list('n91stun2', callback);
});

describe('Add song to playlist', () => {
    test('Succesfully added to playlist', () => {
        function callback(something, data) {
            expect(something).toEqual('added');
        }

        playlist.add_to_play_list({ id: 'n91stun2', vid: 'YQHsXMglC9A', video_name: 'Hello-Adele' }, callback);
    });
});

describe('Check if the song is in the playlist', () => {
    test('Check if song is in playlist', () => {
        function callback(something, data) {
            expect(data.vid).toHaveLength(1)
            expect(data.name).toHaveLength(1)
            expect(something).toEqual(undefined)
        }

        playlist.get_song_list('n91stun2', callback);
    });
});


describe('Delete song to playlist', () => {
    test('Succesfully deleted song from to playlist', () => {
        var info = { id: 'n91stun2', vid: 'YQHsXMglC9A'};
        function callback(ud, data) {
            expect(ud).toEqual("remove");
        }
        playlist.remove_from_list(info, callback)
    });
});
