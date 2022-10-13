import childProcess from 'child_process';

var lsResult = childProcess.execSync('cd audio; ls', { encoding: 'utf-8' });  // the default is 'buffer'
var allSongs = lsResult.split('\n');

for (let i = 0; i < allSongs.length; i++) {
    var currentSong = allSongs[i];
    if (currentSong == ''){
        break
    }
    var lsResult = childProcess.execSync('cd audio; cd "' + currentSong + '"; ls', { encoding: 'utf-8' });  // the default is 'buffer'
    var allFiles = lsResult.split('\n');

    for (let j=0; j<allFiles.length; j++ ){
        var currentFile = allFiles[j];
        var split = currentFile.split(".");
        var ext = split[1];
        if (ext == "mp3" & split[0].split('_')[0] != "clean" ) {
            try {
                var baseInputFile = 'audio/' + currentSong;
                var inputFile = baseInputFile + '/' + currentFile;
                childProcess.execSync('ffmpeg -i "' + inputFile + '" -codec:a libmp3lame -b:a 128k "' + baseInputFile + '/clean_' + currentFile + '" ', { encoding: 'utf-8' });
            } catch (error) {
                console.error(error.message);
            }
        }
    }
}

for (let i = 0; i < allSongs.length; i++) {
    currentSong = allSongs[i];
    if (currentSong == ''){
        break
    }
    lsResult = childProcess.execSync('cd audio; cd "' + currentSong + '"; ls', { encoding: 'utf-8' }); 
    allFiles = lsResult.split('\n');

    for (let j=0; j<allFiles.length; j++ ){
        var currentFile = allFiles[j];
        var split = currentFile.split(".");
        var ext = split[1];
        if (ext == "mp3" & split[0].split('_')[0]== "clean" ) {
            try {

                var baseInputFile = 'audio/' + currentSong;
                var inputFile = baseInputFile + '/' + currentFile;
                var baseOutputFolder = 'Waveforms/' + currentSong;
                var outputFile = baseOutputFolder + '/' + split[0].split('_')[1];

                childProcess.execSync('mkdir -p "' + baseOutputFolder + '"', { encoding: 'utf-8' });
                childProcess.execSync('audiowaveform -i "' + inputFile + '" -o "' + outputFile + '.json" -b 8 -z 12800 -q ', { encoding: 'utf-8' });
                // childProcess.execSync('audiowaveform -i "' + inputFile + '" -o "' + outputFile + '.png" -b 8 -z auto -q ', { encoding: 'utf-8' });

            } catch (error) {
                console.error(error.message);
            }
        }
    }
}