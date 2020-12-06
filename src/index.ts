import babar from 'babar';
import fs from 'fs';

type StatsPerDay = {
  day: string;
  starOne: number[];
  starTwo: number[];
};

type StatsPerYear = {
  year: string;
  days: StatsPerDay[];
};

function loadRawStats(): StatsPerYear[] {
  // I'm Sinning here...
  // if this were more than a one off I would use io-ts
  const raw = Object.assign(JSON.parse(fs.readFileSync('input.json', 'utf8')));
  return Object.keys(raw).map((year) => {
    return {
      year,
      days: Object.keys(raw[year]).map((day) => {
        return {
          day,
          starOne: raw[year][day][1],
          starTwo: raw[year][day][2]
        };
      })
    };
  });
}

if (require.main === module) {
  try {
    const stats = loadRawStats();
    stats.forEach((year) => {
      const starAveragePerDay = year.days.map((day) => {
        const starOneAverage =
          day.starOne.reduce((cur, acc) => cur / 60 + acc) / day.starOne.length;
        const starTwoAverage =
          day.starTwo.reduce((cur, acc) => cur / 60 + acc) / day.starTwo.length;
        return { day: day.day, starOneAverage, starTwoAverage };
      });
      console.log(
        babar(
          starAveragePerDay.map((s) => {
            return [Number.parseInt(s.day, 10), s.starOneAverage];
          }),
          {
            caption: `${year.year} - Star One - Minutes`
          }
        )
      );
      console.log(
        babar(
          starAveragePerDay.map((s) => {
            return [Number.parseInt(s.day, 10), s.starTwoAverage];
          }),
          {
            caption: `${year.year} - Star Two - Minutes`
          }
        )
      );
    });
  } catch (err) {
    console.error(err);
  }
}
