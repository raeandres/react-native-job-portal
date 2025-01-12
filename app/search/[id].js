import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import axios from 'axios'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'

const JobSearch = () => {
    const params = useLocalSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])

        try {
            const options = {
                method: "GET",
                url: `https://jsearch.p.rapidapi.com/search`,
                headers: {
                    "X-RapidAPI-Key": '',
                    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
                },
                params: {
                    query: params.id,
                    page: page.toString(),
                },
            };

            // const response = await axios.request(options);
            const response = mockSearch
            setSearchResult(response.data);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            handleSearch()
        } else if (direction === 'right') {
            setPage(page + 1)
            handleSearch()
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        job={item}
                        handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                    />
                )}
                keyExtractor={(item) => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default JobSearch



const mockSearch = {
    "status": "OK",
    "request_id": "965ea227-bf6a-4304-a810-dbf02347ab80",
    "parameters": {
        "query": "node.js developer in new-york, usa",
        "page": 1,
        "num_pages": 1,
        "date_posted": "all",
        "country": "us",
        "language": "en"
    },
    "data": [
        {
            "job_id": "t-AKAI-wU29Jup6MAAAAAA==",
            "employer_name": "Intetics",
            "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK_KU_MWJwgob7h3oWQdO6HZgRFDKAYKbnACq0&s=0",
            "employer_website": "http://intetics.com/",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "LinkedIn",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME"
            ],
            "job_employment_type_text": "Full-time",
            "job_title": "Senior Node.js Developer",
            "job_apply_link": "https://www.linkedin.com/jobs/view/senior-node-js-developer-at-intetics-4106524923?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "LinkedIn",
                    "apply_link": "https://www.linkedin.com/jobs/view/senior-node-js-developer-at-intetics-4106524923?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Built In",
                    "apply_link": "https://builtin.com/job/senior-nodejs-developer/3013310?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Jooble",
                    "apply_link": "https://jooble.org/jdp/8101226089153585842?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Salary.com",
                    "apply_link": "https://www.salary.com/job/intetics/senior-node-js-developer/j202407051832005048442?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Node Developer Jobs",
                    "apply_link": "https://nodedeveloperjobs.com/jobs/1414-senior-node-js-developer-intetics?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": true
                },
                {
                    "publisher": "Recruit.net",
                    "apply_link": "https://www.recruit.net/job/node-js-developer-jobs/7B279532488D6F3F?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Jobrapido.com",
                    "apply_link": "https://us.jobrapido.com/jobpreview/3301069646?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Jobs - Just Landed",
                    "apply_link": "https://jobs.justlanded.co.uk/bg/United-States_New-York_New-York-City/Business_Other/Senior-Node-js-Developer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "Intetics Inc., a leading global technology company providing custom software application development, distributed professional teams, software product quality assessment, and “all-things-digital” solutions, is looking for a Senior/Lead Node.js Developer to enrich its team with a skilled professional to spread the company’s ideas, vision, content, and messages.\n\nOur client creates digital toys and other playful products for kids around the world. Since the first product launch in 2011, they have released 40+ apps that have been downloaded more than 444 million times in 238 markets, making them the No. 1 mobile-first kids brand in the App Store.\n\nRequirements\n• Great gaming development history\n• Experience with JavaScript\n• Extensive experience with Node.js\n• Knowledge of AWS microservices\n\nResponsibilities\n• New features development\n• Development of matchmaking service\n• Working on the identity service",
            "job_is_remote": false,
            "job_posted_human_readable": "21 days ago",
            "job_posted_at_timestamp": 1734825600,
            "job_posted_at_datetime_utc": "2024-12-22T00:00:00.000Z",
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3Dt-AKAI-wU29Jup6MAAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_salary": null,
            "job_min_salary": null,
            "job_max_salary": null,
            "job_salary_currency": null,
            "job_salary_period": null,
            "job_highlights": {
                "Qualifications": [
                    "Great gaming development history",
                    "Experience with JavaScript",
                    "Extensive experience with Node.js",
                    "Knowledge of AWS microservices"
                ],
                "Responsibilities": [
                    "Development of matchmaking service",
                    "Working on the identity service"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "labrL6U33NVbc3FqAAAAAA==",
            "employer_name": "Keylent",
            "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1uRyDksAhwAeEyF4SSrDMBM5IzWnIJY9vi2mA&s=0",
            "employer_website": "http://www.keylent.com/",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "ZipRecruiter",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME"
            ],
            "job_employment_type_text": "Full-time",
            "job_title": "JavaScript (Node JS) Developer",
            "job_apply_link": "https://www.ziprecruiter.com/c/Keylent/Job/JavaScript-(Node-JS)-Developer/-in-New-York,NY?jid=d44f541a90a462ee&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "ZipRecruiter",
                    "apply_link": "https://www.ziprecruiter.com/c/Keylent/Job/JavaScript-(Node-JS)-Developer/-in-New-York,NY?jid=d44f541a90a462ee&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "Visa status: U.S. Citizens and those authorized to work in the U.S. are encouraged to apply.\nTax Terms: W2, 1099\nCorp-Corp or 3rd Parties: Yes\n\nEducation: Bachelors Degree\nSkills: Expert JavaScript (NodeJS) developer with experience with D3 rendering and C#.\nJob Description:\nRequired Skill Set:\n• NodeJS development experience\n• D3 kit visualization\n• API development\n• Good understanding of SVG formatted documents",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3DlabrL6U33NVbc3FqAAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_salary": null,
            "job_min_salary": null,
            "job_max_salary": null,
            "job_salary_currency": null,
            "job_salary_period": null,
            "job_highlights": {
                "Qualifications": [
                    "Corp-Corp or 3rd Parties: Yes",
                    "Education: Bachelors Degree",
                    "Skills: Expert JavaScript (NodeJS) developer with experience with D3 rendering and C#",
                    "NodeJS development experience",
                    "D3 kit visualization",
                    "API development",
                    "Good understanding of SVG formatted documents"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "HVBbM3eprVezNO0tAAAAAA==",
            "employer_name": "GMS Advisors",
            "employer_logo": null,
            "employer_website": "https://www.gmsadvisors.com",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "Ladders",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME"
            ],
            "job_employment_type_text": "Full-time",
            "job_title": "Node.JS Developer",
            "job_apply_link": "https://www.theladders.com/job/node-js-developer-gmsadvisors-new-york-ny_72609605?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "Ladders",
                    "apply_link": "https://www.theladders.com/job/node-js-developer-gmsadvisors-new-york-ny_72609605?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Offered.AI",
                    "apply_link": "https://www.offered.ai/jobs/clq66b9ak001914omn2ioicin?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Learn4Good",
                    "apply_link": "https://www.learn4good.com/jobs/new-york/software_development/3819189899/e/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "We are looking for a performance-driven full-stack Node.js developer who can help us bring the client to the next level of functionality, scalability, and user experience. Our client is actively developing new event-driven microservices architecture to form a foundational platform for delivering new trading applications.\n\nYou'll work with some of the best and brightest minds in technology and finance, designing, implementing and optimizing our trading platform to deliver new products and drive revenue\n\nJob Responsibilities:\n\nYou will be responsible for delivering software end-to-end, from liaising with product managers and designers, to coordinating across international development teams on engineering and architecture to working with our QA and dev ops teams -- all ultimately to deliver a quality, innovative product to the traders and investors who depend on our platform every day.\n\nRequired Qualifications:\n• Education: at least Bachelor's Degree, preferably in Computer Science\n• 2-4 years' professional web application development experience\n• Experience working with Node.js and JavaScript, and curiosity to learn more\n• Broad knowledge of web platform and technologies\n• Superior analytical and problem-solving ability\n• Effective communication skills to work with different teams across an international company\n• Automated unit testing and test-driven development\n• Robust understanding of performance issues, computational complexity, and code optimization.\n• Familiarity and implementation of industry-standard algorithms and design patterns\n• Proactive and team player who can deliver in a high-pressure demanding environment\n• Interest in UX and UI design implementation",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3DHVBbM3eprVezNO0tAAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_min_salary": 80811,
            "job_max_salary": 121217,
            "job_salary_currency": null,
            "job_salary_period": "YEAR",
            "job_highlights": {
                "Qualifications": [
                    "Education: at least Bachelor's Degree, preferably in Computer Science",
                    "2-4 years' professional web application development experience",
                    "Experience working with Node.js and JavaScript, and curiosity to learn more",
                    "Broad knowledge of web platform and technologies",
                    "Superior analytical and problem-solving ability",
                    "Effective communication skills to work with different teams across an international company",
                    "Automated unit testing and test-driven development",
                    "Robust understanding of performance issues, computational complexity, and code optimization",
                    "Familiarity and implementation of industry-standard algorithms and design patterns",
                    "Proactive and team player who can deliver in a high-pressure demanding environment",
                    "Interest in UX and UI design implementation"
                ],
                "Responsibilities": [
                    "Our client is actively developing new event-driven microservices architecture to form a foundational platform for delivering new trading applications",
                    "You'll work with some of the best and brightest minds in technology and finance, designing, implementing and optimizing our trading platform to deliver new products and drive revenue",
                    "You will be responsible for delivering software end-to-end, from liaising with product managers and designers, to coordinating across international development teams on engineering and architecture to working with our QA and dev ops teams -- all ultimately to deliver a quality, innovative product to the traders and investors who depend on our platform every day"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "67N0QqMnhSqX-IM1AAAAAA==",
            "employer_name": "Insight Global",
            "employer_logo": null,
            "employer_website": "https://insightglobal.com",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "Insight Global",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME",
                "CONTRACTOR",
                "CONTRACTOR"
            ],
            "job_employment_type_text": "Full-time and Contractor",
            "job_title": "Sr. Node.JS Developer",
            "job_apply_link": "https://jobs.insightglobal.com/find_a_job/new-york/job-294912/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "Insight Global",
                    "apply_link": "https://jobs.insightglobal.com/find_a_job/new-york/job-294912/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "A solar farm start-up client is looking for Senior Node.JS developer to join their team in NYC, NY. This person will refactor existing code but also provide recommendations on whether certain modules should be redone. This role will work primarily with integrating APIs and backend services but occasionally help out with some frontend work. This role will be working mainly with Node.JS but the right candidate should be comfortable providing direction and helping the team understand the implications of certain architectural choices. This person will also be assisting in the hiring and development of some front-end developers. This person should be very comfortable taking data coming from CSV format, building out testable units of code, and putting together customer platforms. An advanced level of knowledge of Node.JS is required as well as a strong grasp of APIs and how the work within the integration side. If you are looking for an opportunity to help build out business processes, create a team, and help guide the landscape of a team's development, this could be a great role for you!",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3D67N0QqMnhSqX-IM1AAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_salary": null,
            "job_min_salary": null,
            "job_max_salary": null,
            "job_salary_currency": null,
            "job_salary_period": null,
            "job_highlights": {
                "Qualifications": [
                    "This person should be very comfortable taking data coming from CSV format, building out testable units of code, and putting together customer platforms",
                    "An advanced level of knowledge of Node.JS is required as well as a strong grasp of APIs and how the work within the integration side",
                    "If you are looking for an opportunity to help build out business processes, create a team, and help guide the landscape of a team's development, this could be a great role for you!"
                ],
                "Responsibilities": [
                    "This person will refactor existing code but also provide recommendations on whether certain modules should be redone",
                    "This role will work primarily with integrating APIs and backend services but occasionally help out with some frontend work",
                    "This role will be working mainly with Node.JS but the right candidate should be comfortable providing direction and helping the team understand the implications of certain architectural choices",
                    "This person will also be assisting in the hiring and development of some front-end developers"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "3Edm_8wLtl2chqO9AAAAAA==",
            "employer_name": "Steneral Consulting",
            "employer_logo": null,
            "employer_website": "https://www.steneral.com",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "Indeed",
            "job_employment_type": "CONTRACTOR",
            "job_employment_types": [
                "CONTRACTOR",
                "CONTRACTOR"
            ],
            "job_employment_type_text": "Contractor",
            "job_title": "Node.JS Developer",
            "job_apply_link": "https://www.indeed.com/viewjob?jk=f581f94605342a4e&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": true,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "Indeed",
                    "apply_link": "https://www.indeed.com/viewjob?jk=f581f94605342a4e&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": true
                },
                {
                    "publisher": "SimplyHired",
                    "apply_link": "https://www.simplyhired.com/job/Ip4Bssz2xsfcFFZrSnNXXZipqgVdPeRTbpvmvLGGT4qp20erS_9lzQ?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "Interviews happening ASAP\n\nThe CME Group\n\nRole : Node.JS developer (CIAM Deployment Engineer )\n\nRate : 60/hr C2C but the candidate must be a SOLID, technical, strong candidate. There will be an in-depth technical screening\n\nLocation : Onsite 1 day a week (Mondays) to either NYC, White Plains, or Jersey City office. Must be local\n\nDuration : 6+ month Contract to hire\n\nUSC & GC Only\n\nJob Description:\n\nOur client is seeking a Node.js Developer to join our team and contribute to the development and optimization of a microservices-based platform. This role involves building and maintaining scalable, high-performance services, integrating with various platforms, and ensuring seamless deployment through CI/CD pipelines. The ideal candidate will have a strong background in Node.js development, cloud-based solutions, and API integrations, with a focus on performance, reliability, and security.\n\nKey Responsibilities:\n\nDevelop and maintain Node.js microservices to support platform capabilities.\n\nIntegrate additional services and platforms into the existing architecture.\n\nTroubleshoot and resolve performance and latency issues within the application.\n\nCollaborate with cross-functional teams to design and implement new APIs.\n\nConduct unit testing and support code migrations across Development, QA, and Production environments.\n\nCreate and maintain technical documentation, including runbooks and system guides.\n\nAddress and escalate service issues as necessary, ensuring prompt resolution.\n\nEnhance platform reliability through performance monitoring and proactive troubleshooting.\n\nQualifications:\n\nProgramming Expertise: 7+ years of experience with Node.js and React.js.\n\nCloud Platforms: 3+ years of experience with cloud technologies (Azure, AWS, GCP).\n\nAPI Development: Proficiency in RESTful and Event-Driven APIs, with 3+ years of experience in API gateways.\n\nCI/CD Pipelines: Hands-on experience with tools for code integration and deployment.\n\nMonitoring Tools: 2+ years of experience with SIEM tools like Dynatrace or Splunk.\n\nContainerization: Experience with platforms such as OpenShift or AKS is a plus.\n\nSecurity & Compliance: Familiarity with industry security frameworks such as SOC2 and NIST 800-63A.\n\nEducation: Bachelor's degree in Computer Science, Mathematics, or a related field.\n\nPreferred Skills:\n\nStrong understanding of microservices architecture and Node.js best practices.\n\nBackground in financial services or a highly regulated industry.\n\nProactive problem-solving skills with excellent analytical abilities.\n\nExperience with DevOps tools such as Git, JIRA, and Confluence.",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "White Plains, NY",
            "job_city": "White Plains",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 41.0339862,
            "job_longitude": -73.7629097,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3D3Edm_8wLtl2chqO9AAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_min_salary": 50,
            "job_max_salary": 60,
            "job_salary_currency": null,
            "job_salary_period": "HOUR",
            "job_highlights": {
                "Qualifications": [
                    "Rate : 60/hr C2C but the candidate must be a SOLID, technical, strong candidate",
                    "Programming Expertise: 7+ years of experience with Node.js and React.js",
                    "Cloud Platforms: 3+ years of experience with cloud technologies (Azure, AWS, GCP)",
                    "API Development: Proficiency in RESTful and Event-Driven APIs, with 3+ years of experience in API gateways",
                    "CI/CD Pipelines: Hands-on experience with tools for code integration and deployment",
                    "Monitoring Tools: 2+ years of experience with SIEM tools like Dynatrace or Splunk",
                    "Security & Compliance: Familiarity with industry security frameworks such as SOC2 and NIST 800-63A",
                    "Education: Bachelor's degree in Computer Science, Mathematics, or a related field",
                    "Strong understanding of microservices architecture and Node.js best practices",
                    "Background in financial services or a highly regulated industry",
                    "Proactive problem-solving skills with excellent analytical abilities",
                    "Experience with DevOps tools such as Git, JIRA, and Confluence"
                ],
                "Responsibilities": [
                    "Role : Node.JS developer (CIAM Deployment Engineer )",
                    "There will be an in-depth technical screening",
                    "Location : Onsite 1 day a week (Mondays) to either NYC, White Plains, or Jersey City office",
                    "Our client is seeking a Node.js Developer to join our team and contribute to the development and optimization of a microservices-based platform",
                    "This role involves building and maintaining scalable, high-performance services, integrating with various platforms, and ensuring seamless deployment through CI/CD pipelines",
                    "The ideal candidate will have a strong background in Node.js development, cloud-based solutions, and API integrations, with a focus on performance, reliability, and security",
                    "Develop and maintain Node.js microservices to support platform capabilities",
                    "Integrate additional services and platforms into the existing architecture",
                    "Troubleshoot and resolve performance and latency issues within the application",
                    "Collaborate with cross-functional teams to design and implement new APIs",
                    "Conduct unit testing and support code migrations across Development, QA, and Production environments",
                    "Create and maintain technical documentation, including runbooks and system guides",
                    "Address and escalate service issues as necessary, ensuring prompt resolution",
                    "Enhance platform reliability through performance monitoring and proactive troubleshooting"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "D3lWqbo171TyGZgaAAAAAA==",
            "employer_name": "Atechstar",
            "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd-hps7yHu6ZmQPwa8QzKacpqKLbzwCNNoBVY&s=0",
            "employer_website": null,
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "OPTnation",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME",
                "PARTTIME",
                "CONTRACTOR",
                "CONTRACTOR"
            ],
            "job_employment_type_text": "Full-time, Part-time, and Contractor",
            "job_title": "Node Js Developer",
            "job_apply_link": "https://www.optnation.com/node-js-developer-job-in-new-york-ny-view-jobid-32494?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "OPTnation",
                    "apply_link": "https://www.optnation.com/node-js-developer-job-in-new-york-ny-view-jobid-32494?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Ladders",
                    "apply_link": "https://www.theladders.com/job/node-js-developer-technogeninternationalcompany-new-york-ny_78099147?ir=1&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Learn4Good",
                    "apply_link": "https://www.learn4good.com/jobs/new-york/info_technology/3782190282/e/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Recruit.net",
                    "apply_link": "https://www.recruit.net/job/node-js-developer-jobs/409EA8869798F8D5?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "IT Tech Careers",
                    "apply_link": "https://ittechcareers.com/job/node-js-developer-13/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Jobrapido.com",
                    "apply_link": "https://us.jobrapido.com/jobpreview/5157312985764462592?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "Responsibilities Understand software requirements and translate them into high-performance products. Create robust scalable and reusable code. Coordinate with stakeholders and decision-makers to test and improve services. Provide analytical approaches to solve various problems. Code back-end components and integrate applications into other web services.\n\nKey Skills Web application frameworks. One of the most essential dependencies of any Node. Security. Databases. Package management. Cloud platforms. Source control.",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3DD3lWqbo171TyGZgaAAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_min_salary": 115000,
            "job_max_salary": 135000,
            "job_salary_currency": null,
            "job_salary_period": "YEAR",
            "job_highlights": {
                "Qualifications": [
                    "Key Skills Web application frameworks",
                    "One of the most essential dependencies of any Node"
                ],
                "Responsibilities": [
                    "Responsibilities Understand software requirements and translate them into high-performance products",
                    "Create robust scalable and reusable code",
                    "Coordinate with stakeholders and decision-makers to test and improve services",
                    "Provide analytical approaches to solve various problems",
                    "Code back-end components and integrate applications into other web services"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "uUbS-DFoGzUVklDXAAAAAA==",
            "employer_name": "Anagh Technologies, Inc.",
            "employer_logo": null,
            "employer_website": null,
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "ZipRecruiter",
            "job_employment_type": "CONTRACTOR",
            "job_employment_types": [
                "CONTRACTOR",
                "CONTRACTOR"
            ],
            "job_employment_type_text": "Contractor",
            "job_title": "Node Fullstack Developer",
            "job_apply_link": "https://www.ziprecruiter.com/c/Anagh-Technologies,-Inc./Job/Node-Fullstack-Developer/-in-New-York,NY?jid=744fd803a27062b2&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "ZipRecruiter",
                    "apply_link": "https://www.ziprecruiter.com/c/Anagh-Technologies,-Inc./Job/Node-Fullstack-Developer/-in-New-York,NY?jid=744fd803a27062b2&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "Full Stack Developer Node with Python or Ruby\n\nLong Term\n\nNYC, NY - Remote\n\nKey Qualifications\n• At least 5 years of experience, preferably working as part of a team\n• Deep knowledge of Typescript, JavaScript (Node), Python, or Ruby\n• Deep knowledge of relational database systems like PostgreSQL or MySQL\n• Proven track record of designing, building, delivering, and maintaining critical web-based software\n• You love working in a fast-paced and dynamic environment\n• Extremely organized, detail-oriented, and thorough in every undertaking\n• Excellent verbal and written communication skills\n\nBonus Qualifications\n• Experience with massive parallel processors like Spark\n• Experience with GraphQL\n• Experience with Airflow",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3DuUbS-DFoGzUVklDXAAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_salary": null,
            "job_min_salary": null,
            "job_max_salary": null,
            "job_salary_currency": null,
            "job_salary_period": null,
            "job_highlights": {
                "Qualifications": [
                    "Full Stack Developer Node with Python or Ruby",
                    "At least 5 years of experience, preferably working as part of a team",
                    "Deep knowledge of Typescript, JavaScript (Node), Python, or Ruby",
                    "Deep knowledge of relational database systems like PostgreSQL or MySQL",
                    "Proven track record of designing, building, delivering, and maintaining critical web-based software",
                    "You love working in a fast-paced and dynamic environment",
                    "Extremely organized, detail-oriented, and thorough in every undertaking",
                    "Excellent verbal and written communication skills",
                    "Experience with massive parallel processors like Spark",
                    "Experience with GraphQL",
                    "Experience with Airflow"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113300",
            "job_onet_job_zone": "4",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "WVjSPf3WXIHCiXo4AAAAAA==",
            "employer_name": "codesbright",
            "employer_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd-hps7yHu6ZmQPwa8QzKacpqKLbzwCNNoBVY&s=0",
            "employer_website": "https://www.codesbright.com",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "OPTnation",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME",
                "PARTTIME",
                "CONTRACTOR",
                "CONTRACTOR"
            ],
            "job_employment_type_text": "Full-time, Part-time, and Contractor",
            "job_title": "Node JS Developer",
            "job_apply_link": "https://www.optnation.com/node-js-developer-job-in-new-york-ny-view-jobid-33847?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "OPTnation",
                    "apply_link": "https://www.optnation.com/node-js-developer-job-in-new-york-ny-view-jobid-33847?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                },
                {
                    "publisher": "Techfetch",
                    "apply_link": "https://www.techfetch.com/job-description/node-js-developer-new-york-ny-j3607306?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "Responsibilities Attend Daily Standup Calls & Offshore Co-ordination if required. Deliver components as committed and raise risk if any road blockers. Get prioritize user stories/Defect & interact with business for clarifications suggestions. Prepare Technical Design for stories and solutioning document for changes/enhancements. Build and deploy application code using the continuous integration system Jenkins. Provide recommendations on best practices within RMS and DB related.\n\nKey Skills Valuable Experience. Database Management. Managing Errors. Time Management. Efficient Readable and Compliant Code. Understanding of API Communications",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3DWVjSPf3WXIHCiXo4AAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_min_salary": 25000,
            "job_max_salary": 35000,
            "job_salary_currency": null,
            "job_salary_period": "YEAR",
            "job_highlights": {
                "Qualifications": [
                    "Key Skills Valuable Experience",
                    "Database Management",
                    "Efficient Readable and Compliant Code"
                ],
                "Responsibilities": [
                    "Responsibilities Attend Daily Standup Calls & Offshore Co-ordination if required",
                    "Deliver components as committed and raise risk if any road blockers",
                    "Get prioritize user stories/Defect & interact with business for clarifications suggestions",
                    "Prepare Technical Design for stories and solutioning document for changes/enhancements",
                    "Build and deploy application code using the continuous integration system Jenkins",
                    "Provide recommendations on best practices within RMS and DB related",
                    "Managing Errors",
                    "Time Management"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "7LI1tCn6zgy_cg-wAAAAAA==",
            "employer_name": "The10minutecareersolution",
            "employer_logo": null,
            "employer_website": "https://www.the10minutecareersolution.com",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "CareerBuilder",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME"
            ],
            "job_employment_type_text": "Full-time",
            "job_title": "Distant Full-Stack JavaScript Developer (React + Node.js; Typescript) at RemoteMore",
            "job_apply_link": "https://www.careerbuilder.com/job/J3N1R96J1C0L955C7PH?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": false,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "CareerBuilder",
                    "apply_link": "https://www.careerbuilder.com/job/J3N1R96J1C0L955C7PH?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": false
                }
            ],
            "job_description": "Good work-life stability is inspired. You’ll work with senior colleagues with many alternatives to develop professionally. You may earn a living from home or some other place of your selection.\n\nThe place is full-time and distant.\n\nYour profile\n\nComing from a powerful technical background, you’re anticipated to have:\n• Most well-liked frameworks: React + Node.js or TypeScript (Vue and Angular are additionally related)\n• Prime technical expertise on your degree of expertise – Intermediate or Senior (3+ years of expertise)\n• The mushy expertise to work remotely. Sturdy particular person contributor, sturdy communication expertise.\n• Ardour for distant work. You perceive the professionals and cons of working remotely.\n• Adequate English language expertise to work as a part of a world crew.\n\nWhy ought to YOU apply?\n• Work from wherever you need.\n• Aggressive compensation based mostly in your expertise.\n• Work in a crew with different high builders.\n\n#J-18808-Ljbffr",
            "job_is_remote": true,
            "job_posted_human_readable": "7 days ago",
            "job_posted_at_timestamp": 1736035200,
            "job_posted_at_datetime_utc": "2025-01-05T00:00:00.000Z",
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3D7LI1tCn6zgy_cg-wAAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_salary": null,
            "job_min_salary": null,
            "job_max_salary": null,
            "job_salary_currency": null,
            "job_salary_period": null,
            "job_highlights": {
                "Qualifications": [
                    "Most well-liked frameworks: React + Node.js or TypeScript (Vue and Angular are additionally related)",
                    "Prime technical expertise on your degree of expertise – Intermediate or Senior (3+ years of expertise)",
                    "The mushy expertise to work remotely",
                    "Sturdy particular person contributor, sturdy communication expertise",
                    "Ardour for distant work",
                    "You perceive the professionals and cons of working remotely",
                    "Adequate English language expertise to work as a part of a world crew"
                ],
                "Benefits": [
                    "You may earn a living from home or some other place of your selection",
                    "Work from wherever you need",
                    "Aggressive compensation based mostly in your expertise",
                    "Work in a crew with different high builders"
                ],
                "Responsibilities": [
                    "You’ll work with senior colleagues with many alternatives to develop professionally"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113400",
            "job_onet_job_zone": "3",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        },
        {
            "job_id": "WzJkjFxTozXTPegyAAAAAA==",
            "employer_name": "Solere",
            "employer_logo": null,
            "employer_website": "https://www.solere.co.uk",
            "employer_company_type": null,
            "employer_linkedin": null,
            "job_publisher": "ZipRecruiter",
            "job_employment_type": "FULLTIME",
            "job_employment_types": [
                "FULLTIME"
            ],
            "job_employment_type_text": "Full-time",
            "job_title": "Full Stack Engineer x 2 | New York, NY | React, Node, Typescript, AWS",
            "job_apply_link": "https://www.ziprecruiter.com/c/Solere/Job/Full-Stack-Engineer-x-2-%7C-New-York,-NY-%7C-React,-Node,-Typescript,-AWS/-in-New-York,NY?jid=31cc52106c149dd0&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "job_apply_is_direct": true,
            "job_apply_quality_score": null,
            "apply_options": [
                {
                    "publisher": "ZipRecruiter",
                    "apply_link": "https://www.ziprecruiter.com/c/Solere/Job/Full-Stack-Engineer-x-2-%7C-New-York,-NY-%7C-React,-Node,-Typescript,-AWS/-in-New-York,NY?jid=31cc52106c149dd0&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
                    "is_direct": true
                }
            ],
            "job_description": "Job Title: Full Stack Developer| React, Node, Typescript, AWS\n\nSkills: Next.js, Nest.js, Typescript, AWS\n\nLocation: New York, NY | Onsite/Hybrid\n\nEmployment: Full Time, Permanent\n\nCompensation: $130k-$180k p/a + Equity + Benefits & more\n\nImportant note: This role is only suitable for candidates that are based in NY or within commuting area or ready to relocate to New York as it requires you to work from the company headquarter in the city a few days a week.\n\nJoin our dynamic client operating in the Finance sector leveraging the cutting edge AI technologies to improve the financial services industry and other verticals. Dedicated to empowering businesses to reach their full potential buy using the platform to add exponential growth opportunities.\n\nThis is one of the most exciting and thrilling projects in the AI space which will provide you the opportunity to work alongside some of the smartest people in this sector.\n\nRequired skills:\n• 5+ years of industry experience.\n• Extensive knowledge of React and TypeScript.\n• Solid skills with Next.js, Nest.js, AWS\n• Interest in developing AI tools, products and services.\n• Experience with the latest framework features\n• Attention to detail and ability to take ownership.\n• Desire to produce highest quality work and code.\n• Excellent communication skills.\n\nRequirements:\n• Exceptional problem-solving skills, adaptability to complex issues.\n• Proficient in React, Typescript, Node\n\nDesirable skills:\n• Familiarity with Tailwind, and other UI frameworks is desirable.\n• Exposure to UX/UI Designs\n\nImportant note: Solere is acting as a recruitment agency in connection to this role. This role is only suitable for candidates based in New York, NY(USA) only. By applying to this role or submitting your CV you agree for Solere to present your resume to companies.",
            "job_is_remote": false,
            "job_posted_human_readable": null,
            "job_posted_at_timestamp": null,
            "job_posted_at_datetime_utc": null,
            "job_location": "New York, NY",
            "job_city": "New York",
            "job_state": "New York",
            "job_country": "US",
            "job_latitude": 40.7127753,
            "job_longitude": -74.0059728,
            "job_benefits": null,
            "job_google_link": "https://www.google.com/search?q=jobs&gl=us&hl=en&udm=8#vhid=vt%3D20/docid%3DWzJkjFxTozXTPegyAAAAAA%3D%3D&vssid=jobs-detail-viewer",
            "job_offer_expiration_datetime_utc": null,
            "job_offer_expiration_timestamp": null,
            "job_required_experience": {
                "no_experience_required": false,
                "required_experience_in_months": null,
                "experience_mentioned": false,
                "experience_preferred": false
            },
            "job_min_salary": 130000,
            "job_max_salary": 180000,
            "job_salary_currency": null,
            "job_salary_period": "YEAR",
            "job_highlights": {
                "Qualifications": [
                    "5+ years of industry experience",
                    "Extensive knowledge of React and TypeScript",
                    "Solid skills with Next.js, Nest.js, AWS",
                    "Interest in developing AI tools, products and services",
                    "Experience with the latest framework features",
                    "Attention to detail and ability to take ownership",
                    "Desire to produce highest quality work and code",
                    "Excellent communication skills",
                    "Exceptional problem-solving skills, adaptability to complex issues",
                    "Proficient in React, Typescript, Node",
                    "Exposure to UX/UI Designs"
                ],
                "Benefits": [
                    "Compensation: $130k-$180k p/a + Equity + Benefits & more"
                ]
            },
            "job_job_title": null,
            "job_posting_language": null,
            "job_onet_soc": "15113300",
            "job_onet_job_zone": "4",
            "job_occupational_categories": null,
            "job_naics_code": null,
            "job_naics_name": null
        }
    ]
}