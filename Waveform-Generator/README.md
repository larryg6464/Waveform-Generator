# This is a simple script for generating .json waveform files using audiowaveform for use in wavesurfer.js
1) You have to install node to run this program.
	- Here is a link to download node: https://nodejs.org/en/download/
2) You must install ffmpeg for the code to work. It is used to clean mp3 files by resampling to a constant rate.
	- Here is a link to download ffmpeg: https://ffmpeg.org/download.html
3) You must install audiowaveform to convert mp3 into json files.
	- Here is a link to download audiowaveform: https://github.com/bbc/audiowaveform
4) Place .mp3 files into one folder per song in the audio folder. 
5) In a terminal, run "npm start". Copies of the audio files should be generated with a consistent sample rate, and titled "clean_ ...". The json files will then be input into the waveform folder for each song. 
6) Copy these song folders into the main asset waveform folder.
