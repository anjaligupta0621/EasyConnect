import React, {Component} from 'react';
import {TextField, Button, Container, Divider, Modal, Box, Typography, List, ListItem, ListItemText } from '@material-ui/core';
// import EmailIcon from '@mui/icons-material/Email';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import axios from 'axios';
import { saveAs } from 'file-saver';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import GetAppIcon from '@material-ui/icons/GetApp';
import {Row, Col} from 'react-bootstrap';
import {Paper, withStyles, Grid} from '@material-ui/core';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 1.5,
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

class Experience extends Component {

  state = {
    showModal: false
  }

  continue = e => {
    e.preventDefault ();
    this.props.nextStep ();
  };

  back = e => {
    e.preventDefault ();
    this.props.prevStep ();
  };

  showModal = () => {
    this.setState({showModal: true});
  }

  hideModal = () => {
    this.setState({showModal: false});
  }

  onSubmitHandler = () => {

    // console.log(this.props.values);

    const candidate_profile = {
      Firstname: this.props.values.firstname,
      Lastname: this.props.values.lastname,
      Email: this.props.values.email,
      Phone: this.props.values.phone,
      Github: this.props.values.github,
      Linkedin: this.props.values.linkedin,
      Facebook: this.props.values.facebook,
      Instagram: this.props.values.instagram,

      // Education Information
      Education: [
        {
          College: this.props.values.college,
          Fromyear: this.props.values.fromyear1,
          Toyear: this.props.values.toyear1,
          Qualification: this.props.values.qualification1,
          Description: this.props.values.description1
        },
        {
          College: this.props.values.school,
          Fromyear: this.props.values.fromyear2,
          Toyear: this.props.values.toyear2,
          Qualification: this.props.values.qualification2,
          Description: this.props.values.description2
        }
      ],
      

      // Project Information...
      Project: [
        {
          Title: this.props.values.title1,
          Link: this.props.values.link1,
          ProjectDescription: this.props.values.projectDescription1,
        },
        {
          Title: this.props.values.title2,
          Link: this.props.values.link2,
          ProjectDescription: this.props.values.projectDescription2,
        }
      ],
      

      // Experience Information
      Professionalexperience: [
        {
          Company: this.props.values.institute1,
          Position: this.props.values.position1,
          Duration: this.props.values.duration1,
          ExperienceDescription: this.props.values.experienceDescription1,
        },
        {
          Company: this.props.values.institute2,
          Position: this.props.values.position2,
          Duration: this.props.values.duration2,
          ExperienceDescription: this.props.values.experienceDescription2,
        }
      ],
      
    // Extra Information
      Skills: [this.props.values.skill1, this.props.values.skill2, this.props.values.skill3, this.props.values.skill4, this.props.values.skill5],
      Interests: [this.props.values.interest1, this.props.values.interest2, this.props.values.interest3],
    }

    console.log(candidate_profile);

    this.hideModal();

    // axios.post('http://localhost:8081/updateCandidateProfile', candidate_profile)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    var raw = JSON.stringify(candidate_profile)
    console.log(raw);

      // fetch(`http://localhost:8081/updateCandidateProfile`, {
      //   body: raw,
      //   method: "POST",
      //   mode: "cors",
      // })
      //   .then((res) => {
      //     return res.json()
      //   })
      //   .then((result) => {
      //     console.log(result)
      //     window.location.assign('/user')
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });

      window.location.assign('/user');
    };

    // window.location.assign('/user');
    // axios
    //   .post ('/create-pdf', this.props.values)
    //   .then (() => {
    //     axios
    //       .get ('fetch-pdf', {responseType: 'arraybuffer'})
    //       .then (res => {
    //         const pdfBlob = new Blob ([res.data], {type: 'application/pdf'});
    //         saveAs (pdfBlob, `${this.props.values.firstname}'s Resume.pdf`);
    //       })
    //       .catch (err => {
    //         console.log (err);
    //       });
    //   })
    //   .catch (err => {
    //     console.log (err);
    //   });
  

  render () {
    const {values} = this.props;
    const {classes} = this.props;

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    return (
      <Paper className={classes.padding}>
        <Modal
        open={this.state.showModal}
        onClose={this.hideModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style= {{
            backgroundColor: '#323754',
            color: "white",
            padding: '10px'
          }} id="modal-modal-title" variant="h6" component="h2">
            Please check the following details. <br/>
            If you need to edit any of them, click on No and continue editing. <br />
            If everything is fine, please click Yes. <br/>
          </Typography>
          <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem button>
              <ListItemText primary="First Name" secondary={this.props.values.firstname} />
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemText primary="Last Name" secondary={this.props.values.lastname} />
            </ListItem> 
            <Divider />
            <ListItem button>
              <ListItemText primary="Email" secondary={this.props.values.email} />
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemText primary="Phone Number" secondary={this.props.values.phone} />
            </ListItem> 
          </List>
          <Button variant='contained' onClick={this.onSubmitHandler}>Yes</Button>
          <Button style={{float: "right"}} variant='contained' onClick={this.hideModal}>No</Button>
        </Box>
      </Modal>
        <Card style={{
          backgroundColor: '#323754',
          color: "white"
        }}>
          <CardHeader title="EXTRA DETAILS" />
        </Card>
        <CardContent>
          <div className={classes.margin}>
            <Grid container spacing={2} alignItems="center" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Skills/Languages</span>
                </h5>
              </Grid>
              <Grid item xs="false" lg={8} />
              <br />
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill1"
                  label="Skill 1"
                  style={{width: '90%'}}
                  value={values.skill1}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill2"
                  label="Skill 2"
                  style={{width: '90%'}}
                  value={values.skill2}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill3"
                  label="Skill 3"
                  style={{width: '90%'}}
                  value={values.skill3}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill4"
                  label="Skill 4"
                  style={{width: '90%'}}
                  value={values.skill4}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>

              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill5"
                  label="Skill 5"
                  style={{width: '90%'}}
                  value={values.skill5}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Skill 6"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="skill6"
                  value={values.skill6}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid container spacing={2} alignItems="flex-start" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Interest</span>
                </h5>
              </Grid>
              <Grid item xs={0} lg={8} />
              <br />
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 1"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest1"
                  value={values.interest1}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 2"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest2"
                  value={values.interest2}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 3"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest3"
                  value={values.interest3}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 4"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest4"
                  value={values.interest4}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 5"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest5"
                  value={values.interest5}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 6"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest6"
                  value={values.interest6}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>
        <Container className={classes.margin}>
          <Row>
            <Col xs={4} />
            <Col xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.back}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                disabled
                color="secondary"
                onClick={this.continue}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.showModal}
            endIcon={<GetAppIcon />}
          >
            Submit
          </Button>
        </Container>
        <p className="text-center text-muted">Page 5</p>
      </Paper>
    );
  }
}

export default withStyles (styles) (Experience);