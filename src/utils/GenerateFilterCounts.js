export const generateFilterCounts = (courses) => {
    const counts = {
        level: {},
        price: { free: 0, paid: 0 },
        duration: { "0-2": 0, "2-10": 0, "10+": 0 },
        rating: { 2: 0, 3: 0, 4: 0 },
    };

    courses.forEach((course) => {
        // LEVEL
        const level = course.level;
        if (counts.level[level]) counts.level[level]++;
        else counts.level[level] = 1;

        // PRICE
        if (course.coursePrice === 0) counts.price.free++;
        else counts.price.paid++;

        // DURATION
        const totalDuration = course.courseContent
            .flatMap((ch) => ch.chapterContent)
            .reduce((acc, lec) => acc + lec.lectureDuration, 0);

        if (totalDuration <= 120) counts.duration["0-2"]++;
        else if (totalDuration <= 600) counts.duration["2-10"]++;
        else counts.duration["10+"]++;

        // RATING
        const ratings = course.courseRatings.map((r) => r.rating);
        const avgRating =
            ratings.length > 0
                ? ratings.reduce((a, b) => a + b, 0) / ratings.length
                : 0;

        if (avgRating >= 2) counts.rating[2]++;
        if (avgRating >= 3) counts.rating[3]++;
        if (avgRating >= 4) counts.rating[4]++;
    });

    return counts;
};
