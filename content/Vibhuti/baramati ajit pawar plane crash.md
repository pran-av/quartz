---
title: Investigating Baramati Airport Learjet Crash
date: 2026-01-28
---
>[!warning] Personal Exploration not for Professional Use
>This is a personal exploration of the event, and hence any research or discussion should not be reproduced for professional communications or decision making. Please refer to official sources and investigations for professional use.

I am writing this since I wanted to explore the root causes that likely led to the crash of Bombardier Learjet 45XR on morning of 28th January IST around 8:44 am while landing onto runway 11 of Baramati Airport.

The private jet was carrying the deputy chief minister of Maharashtra, Shri Ajit Pawar. The crash led to the unfortunate demise of all five individuals onboard (including 2 pilots, and a cabin member).
# Geography of the airport

The airport is located near to the city of Baramati which is part of Pune district - it is geographically eastwards of Mumbai and Pune. It has a single airstrip servicing two runways, runway 11 (northwest to southeast) and runway 29 (southeast to northwest).

Elevation of airstrip = 604 m from mean sea level (MSL)
Elevation of Baramati (city) = 538 m MSL

So comparatively, the airport sits on a plateau.

As per Open Street Maps, I am able to see that the airport crosses a contour line as well, meaning part of the airport is required to be elevated so that the entire airstrip is levelled.

In the below map you can observe the contour dividing the airstrip in half. So this makes the North West (NW) end elevated with a visible embanking while the other end is on a flat ground. However there is no evidence if the NW end is simply on a natural plateau edge or on a manually created embankment.

![[learjet-crash-osm-contour.png|500]]

The following image shows the flat SE end and a slightly elevated NW end. Its not entirely a table top airstrip, but from NW end which is runway 11, we can say it may have a potential impact that table top runways create.

![[baramati-airstrip-birds-eye.png|500]]
$^1$

Below image shows the crash site, the airplane crashed on *left* side of the NW approach to the runway 11.
![[learjet-crash-site.png|500]]

So was the elevated end the cause of crash? Lets revisit this question after exploring the nature of this airport.

# Nature of the airport

Baramati airport is a training centre that accommodates private landings of turboprops or small private jets like Learjet 45. It does not handle any commercial operations - hence it is not have all the standard safety infrastructure.

The airport does not have,
1. Precision Approach Path Indicator (PAPI) - the coloured lights that define the path of the runway for visual reference. Additional from the images we can also see the road markings (in white) are not maintained.
2. VHF Omnidirectional Range (VOR) - this is a continuous radio beacon that is streamed 360 degrees to measure the range between the flight and the airport.
3. Instrument Landing System (ILS) - these are radio signals that transmitted to the aircraft on horizontal alignment and vertical descent path alignment.

So without this, the airport entirely requires visual landing. Meaning the airstrip has to be visible for the landing to take place. For this reason Baramati airport is only operational during the day and clear weather conditions.

# Flight and Radio Data

From Flightradar24$^2$ Data and PIB$^3$ we have following datapoints,
1. The first landing attempt on runway 11 was aborted - the crew reported "runway not in sight"
2. The second attempt on the same runway the crew reported "runway in sight"
3. The crew was cleared for landing at 8:43 am IST, however no response was received
4. The Flightradar24 data cutoff is at 8:43am IST at alt 2600 ft (792 meters) and 153 kt ground speed. The airstrip sits at 604 meters so the position of aircraft was around 188 meters above.
![[learjet-crash-flightradar24.png|500]]

So if the runway was visible, what would have been the issue? We still have not concluded on the airstrip elevation angle.

I am not sure how accurate flight radar data is, as per the last reading, the plane is atleast 11 kms from the airstrip. The crash happened at 8:44am IST as per PIB. So to reach that airport within a minute: **the aircraft would have to double its speed to 350 kt.**

![[learjet-crash-earth-distance.png|500]]

Now lets consider the speed was increased to 350 kt. The height to lose is 188 meters which is equivalent to 3.15 mps. Even with speed increase, the landing fails, as the glide angle becomes 0.98 degree. The vertical alignment that we discussed above should be 3 degrees as standard.

To maintain a 3 degree glide slope with 350 knots and 11 kms to cover. The altitude should be ~ 1180 meters, which is **280 meters short from the last reported altitude as per flight radar**.

For all these calculations I used ChatGPT with following prompts, you can try them as well (again note although Flightradar data is reported to be accurate their can be complications based on what technique was used to record that data - I am not diving deeper into those).

```
Prompt 1: Consider the airplane is given a go ahead to land, at that instance the altitude is 792.5 meters, the airstrip altitude from MSL is 604m. The ground speed or aircraft is 153 kt. Consider horizontal alignment and glide slope alignment. Approximate distance from runway is 11 kms. Is the speed, position and altitude ideal for landing? Consider landing occurs in next 60 seconds.

Prompt 2: Consider that the speed was increased to 356.5 kt, now calculate the descent numbers based on this.
```

# Conclusion

So basically the math based on last recorded data on flightradar24 does not match. If the landing permission was given on 8:43 am and the crash was reported on 8:44 am. Assuming flightradar24 data is correct - the pilot has to double the speed and increase the altitude by 280 meters.

Now even this manoeuvre will expense some time complicating our calculation further (this is a scenario only an experienced pilot can judge to be normal or not). 

Considering if this manoeuvre actually took place, it might be that the small detail of few meters of embankment for runway 11 approach was missed. And hence the vertical alignment fell a few meters short to the actual airstrip.

PS: Like I mentioned in the start, this is just a personal exploration into aviation - please do your own research before concluding onto anything.

---
## Resources

$^1$ [Baramati Airstrip - Image](https://www.filmapia.com/scout/places/Airport3)
$^2$ [Flightradar24 - VTSSK](https://www.flightradar24.com/data/aircraft/vt-ssk#3e159942)
$^3$ [Sequence of Events - PIB Gov](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2219536&reg=3&lang=2)
$^4$ [Flightradar24 - Crash Report](https://www.flightradar24.com/blog/flight-tracking-news/major-incident/learjet-45-crash-in-india-deputy-chief-minister-on-board/)