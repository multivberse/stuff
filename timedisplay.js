function timeDisplay(time) {
  time = time / 1
  if (time <= 10) return time.toFixed(3) + " seconds"
  time = Math.floor(time)

  if (time >= 31536000) {
      return showPlural(Math.floor(time / 31536000), " year", true) + showPlural(Math.floor((time % 31536000) / 86400), " day", true) + showPlural(Math.floor((time % 86400) / 3600), " hour", true) + showPlural(Math.floor((time % 3600) / 60), " minute", true) + "and "+ showPlural(Math.floor(time % 60), " second", false)
  } else if (time >= 86400) {
      return showPlural(Math.floor(time / 86400), " day", true) + showPlural(Math.floor((time % 86400) / 3600), " hour", true) + showPlural(Math.floor((time % 3600) / 60), " minute", true) + "and "+ showPlural(Math.floor(time % 60), " second", false)
  } else if (time >= 3600) {
      return showPlural(Math.floor(time / 3600), " hour", true) + showPlural(Math.floor((time % 3600) / 60), " minute", true) + "and "+ showPlural(Math.floor(time % 60), " second", false)
  } else if (time >= 60) {
      return showPlural(Math.floor(time / 60), " minute", false) + "and "+ showPlural(Math.floor(time % 60), " second", false)
  } else return showPlural(Math.floor(time % 60), " second", false)
}
function showPlural(time, unit, comma) {
   if (time == 1) {return time + unit + (comma ? ", " : " ")} else {return time + unit + (comma ? "s, " : "s ")}
}

let small = ['','m','μ','n','p','f','a','z','y']
function preformat(int) {
  if (int.toString().length == 1) return "0"+int
  else return int
}

function timeDisplayShort(time, small, places) {
	if (time > Number.MAX_VALUE) {
		if (time == 1/0) return 'eternity'
		return (time / 31536e4).toFixed(3) + 'y'
	}
	time = time / 1
	if (small && time < 1) {
                if (time < Number.MIN_VALUE) return time.toPrecision(4) + "s"
		if (time < 1e-24) return time.toPrecision(4)+"s"
		if (time < 0.01) {
			var log = Math.ceil(-Math.log10(time))
			return (time * Math.pow(1e3, Math.ceil(log/3))).toFixed(Math.max(places+(log-1)%3-2, 0)) + " "+small[Math.ceil(log/3)]+"s"
		}
		return (time * 100).toFixed(time < 0.1 ? places : places-1) + " cs"
	}
	if (time < 60) return time.toFixed(time < 10 ? places : places-1) + " s" + (rep ? "" : "econds")
	if (time < 3600) return Math.floor(time/60) + ":" + preformat(Math.floor(time%60))
	if (time < 86400) return Math.floor(time/3600) + ":" + preformat(Math.floor((time/60)%60)) + ":" + preformat(Math.floor(time%60))
	if (time < 31556952 && small) return Math.floor(time/86400) + 'd ' + ((time/3600)%24).toFixed(1) + "hr"
	if (time < 31556952) return Math.floor(time/86400) + 'd ' + Math.floor((time/3600)%24) + ":" + preformat(Math.floor((time/60)%60)) + ":" + preformat(Math.floor(time%60))
	if (time < 315569520) return Math.floor(time/31536e3) + 'yr ' + Math.floor((time/86400)%365.2425) + 'd ' + Math.floor((time/3600)%24) + ":" + preformat(Math.floor((time/60)%60)) + ":" + preformat(Math.floor(time%60))
	return Math.floor(time/31536e3) + 'yr ' + ((time/86400)%365.2425).toFixed(1) + 'd'
}
