import React from "react";
import { Container, Box, Card, Grid, Paper, CardHeader, List, ListItem, Divider} from "@material-ui/core";
// import ListItemButton from '@mui/material';

class ViewCandidate extends React.Component {

    state = {
        candidate: {
            "Firstname": "Ross",
            "Lastname": "Geller",
            "Email": "rossgeller@gmail.com",
            "Phone": "7654738299",
            "Github": "www.github.com",
            "Linkedin": "www.linkedin.com",
            "Facebook": "www.facebook.com",
            "Instagram": "www.instagram.com",
            "Education": [
                {
                    "College": "University of Florida",
                    "Fromyear": "2022",
                    "Toyear": "2024",
                    "Qualification": "Master's",
                    "Description": "Computer and Information Sciences"
                },
                {
                    "College": "JIIT",
                    "Fromyear": "2015",
                    "Toyear": "2019",
                    "Qualification": "Bachelor's",
                    "Description": "Computer Science and Engineering"
                }
            ],
            "Project": [
                {
                    "Title": "Easy Connect",
                    "Link": "www.easyconnect-se.com",
                    "ProjectDescription": "Job Portal"
                },
                {
                    "Title": "ABCD",
                    "Link": "abcd.com",
                    "ProjectDescription": "ABCD"
                }
            ],
            "Professionalexperience": [
                {
                    "Company": "Wipro",
                    "Position": "Project Engineer",
                    "Duration": "2 years",
                    "ExperienceDescription": "Project Engineer"
                },
                {
                    "Company": "Kitinfinet",
                    "Position": "Frontend Intern",
                    "Duration": "2 months",
                    "ExperienceDescription": "Internship"
                }
            ],
            "Skills": [
                "Python",
                "Golang",
                "Salesforce",
                "MySQL"
            ],
            "Interests": [
                "Machine Learning",
                "Software Engineering",
                "Artificial Intelligence"
            ]
        },
        open: false
    }

    handleOpen = () => {
        this.setState({open: !this.state.open})
    }


    render() {

        return (
            <Container>
                <Card style={{
                    backgroundColor: '#323754',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title="PERSONAL DETAILS" />
                </Card>
                <Card>
                    <List>
                        <ListItem>
                            <Box>
                                Name: <span style={{fontWeight: "bold"}}>{this.state.candidate.Firstname}  {this.state.candidate.Lastname}</span>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box>
                                Email: <span style={{fontWeight: "bold"}}>{this.state.candidate.Email}</span>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box>
                                Phone Number: <span style={{fontWeight: "bold"}}>{this.state.candidate.Phone}</span>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box>
                                LinkedIn: <span style={{fontWeight: "bold"}}>{this.state.candidate.Linkedin}</span>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box>
                                Github Link: <span style={{fontWeight: "bold"}}>{this.state.candidate.Github}</span>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box>
                                Facebook: <span style={{fontWeight: "bold"}}>{this.state.candidate.Facebook}</span>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box>
                                Instagram: <span style={{fontWeight: "bold"}}>{this.state.candidate.Instagram}</span>
                            </Box>
                        </ListItem>
                    </List>
                </Card>
                <Card style={{
                    backgroundColor: '#323754',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title="EDUCATION DETAILS" />
                </Card>
                <Card>
                        { this.state.candidate.Education.map((item) =>  (
                            <List>
                            <ListItem>
                                <Box>
                                    College: <span style={{fontWeight: "bold"}}>{item.College}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    From: <span style={{fontWeight: "bold"}}>{item.Fromyear}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    To: <span style={{fontWeight: "bold"}}>{item.Toyear}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    Qualification: <span style={{fontWeight: "bold"}}>{item.Qualification}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    Description: <span style={{fontWeight: "bold"}}>{item.Description}</span>
                                </Box>
                            </ListItem>
                            <Divider />
                        </List>
                        )
                        )}
                </Card>
                <Card style={{
                    backgroundColor: '#323754',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title="PROJECTS DEVELOPED" />
                </Card>
                <Card>
                        { this.state.candidate.Project.map((item) =>  (
                            <List>
                            <ListItem>
                                <Box>
                                    Project Title: <span style={{fontWeight: "bold"}}>{item.Title}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    Project Link: <span style={{fontWeight: "bold"}}>{item.Link}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    Description: <span style={{fontWeight: "bold"}}>{item.ProjectDescription}</span>
                                </Box>
                            </ListItem>
                            <Divider />
                        </List>
                        )
                        )}
                </Card>
                <Card style={{
                    backgroundColor: '#323754',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title=" PROFESSIONAL EXPERIENCE" />
                </Card>
                <Card>
                        { this.state.candidate.Professionalexperience.map((item) =>  (
                            <List>
                            <ListItem>
                                <Box>
                                    Company Name: <span style={{fontWeight: "bold"}}>{item.Company}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    Position: <span style={{fontWeight: "bold"}}>{item.Position}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    Duration: <span style={{fontWeight: "bold"}}>{item.Duration}</span>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    Description: <span style={{fontWeight: "bold"}}>{item.ExperienceDescription}</span>
                                </Box>
                            </ListItem>
                            <Divider />
                        </List>
                        )
                        )}
                </Card>
                <Card style={{
                    backgroundColor: '#323754',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title="SKILLS AND INTERESTS" />
                </Card>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Card style={{
                                padding: "10px",
                                marginRight: "10px"
                            }}>
                            { this.state.candidate.Skills.map((item) =>  (
                            <List>
                            <ListItem>
                                <Box>
                                    <span style={{fontWeight: "bold", textAlign: "center"}}>{item}</span>
                                </Box>
                            </ListItem>
                        </List>
                        )
                        )}
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                        { this.state.candidate.Interests.map((item) =>  (
                            <List>
                            <ListItem>
                                <Box>
                                    <span style={{fontWeight: "bold", textAlign: "center"}}>{item}</span>
                                </Box>
                            </ListItem>
                        </List>
                        )
                        )}
                        </Card>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        )
    }
}

export default ViewCandidate;