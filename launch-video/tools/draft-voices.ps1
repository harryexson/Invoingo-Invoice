Add-Type -AssemblyName System.Speech
$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice.SelectVoice('Microsoft Zira Desktop')
$voice.Rate=2
$out = Join-Path $PSScriptRoot '../public/audio'
$lines = @{
 'user-1.wav'="Where's my invoice for Alex Morgan?"
 'mio-1.wav'="Alex's invoice is paid in full."
 'cheryl.wav'='Meet Invoingo. Your invoice maker on the go. And now, MioBot helps keep your work moving.'
 'user-2.wav'='Draft a reminder for the first one.'
 'mio-2.wav'="Here's a draft. Nothing has been sent."
 'user-3.wav'='Make it friendlier.'
 'mio-3.wav'='Ready for your review.'
 'mio-paid.wav'="Alex Morgan's payment is recorded. One thousand, three hundred and two dollars."
}
foreach($entry in $lines.GetEnumerator()) {
 $voice.SetOutputToWaveFile((Join-Path $out $entry.Key))
 $voice.Speak($entry.Value)
 $voice.SetOutputToNull()
}
$voice.Dispose()
Write-Output 'Draft voices generated. Replace these local TTS tracks before production approval.'
