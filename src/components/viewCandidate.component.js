import React from "react";
import { Container, Box, Card, Grid, Paper, CardHeader, List, ListItem, Divider} from "@material-ui/core";
import JobSeekerHeader from "./jobSeekerHeader.component";
// import ListItemButton from '@mui/material';

class ViewCandidate extends React.Component {

    state = {
        candidate: {},
        open: false
    }

    handleOpen = () => {
        this.setState({open: !this.state.open})
    }

    componentDidMount = () => {
        var raw = JSON.stringify({
            userName: localStorage.getItem('userName'),
            token: localStorage.getItem('token')
        })
        console.log(raw);
    
          fetch(`http://localhost:8081/getCandidateProfile`, {
            body: raw,
            method: "POST",
            mode: "cors",
          })
            .then((res) => {
              return res.json()
            })
            .then((result) => {
              this.setState({candidate: result})
              console.log(this.state.candidate)
            //   window.location.assign('/viewCandidate')
            })
            .catch((e) => {
              console.log(e)
            });
    }

    render() {

        return (
            <div className="body-outer jobseeker-main">
            <JobSeekerHeader />
            {this.state.candidate ? <Container>
                <Card style={{
                    backgroundColor: '#00bcd4',
                    color: "white",
                    marginTop: "10px"
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
                    backgroundColor: '#00bcd4',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title="EDUCATION DETAILS" />
                </Card>
                <Card>
                        {this.state.candidate.Education ? this.state.candidate.Education.map((item) =>  (
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
                        ) : <div> Loading... </div>}
                </Card>
                <Card style={{
                    backgroundColor: '#00bcd4',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title="PROJECTS DEVELOPED" />
                </Card>
                <Card>
                        {this.state.candidate.Project ? this.state.candidate.Project.map((item) =>  (
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
                        ) : <div> Loading... </div>}
                </Card>
                <Card style={{
                    backgroundColor: '#00bcd4',
                    color: "white"
                    }}>
                    <CardHeader style={{textAlign: "center"}} title=" PROFESSIONAL EXPERIENCE" />
                </Card>
                <Card>
                        {this.state.candidate.Professionalexperience ? this.state.candidate.Professionalexperience.map((item) =>  (
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
                        ) : <div> Loading... </div>}
                </Card>
                <Card style={{
                    backgroundColor: '#00bcd4',
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
                            {this.state.candidate.Skills ? this.state.candidate.Skills.map((item) =>  (
                            <List>
                            <ListItem>
                                <Box>
                                    <span style={{fontWeight: "bold", textAlign: "center"}}>{item}</span>
                                </Box>
                            </ListItem>
                        </List>
                        )
                        ): <div> Loading... </div>}
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                        {this.state.candidate.Interests ? this.state.candidate.Interests.map((item) =>  (
                            <List>
                            <ListItem>
                                <Box>
                                    <span style={{fontWeight: "bold", textAlign: "center"}}>{item}</span>
                                </Box>
                            </ListItem>
                        </List>
                        )
                        ) : <div> Loading </div>}
                        </Card>
                        </Grid>
                    </Grid>
                </Box>

            </Container> : <div>Loading</div>}
            </div>

        )
    }
}

export default ViewCandidate;