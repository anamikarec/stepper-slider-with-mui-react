import React from "react";
import { makeStyles } from "@material-ui/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 14px;
`;
const logoCont = styled.div``;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  }
  // button: {
  //   // marginRight: theme.spacing(1)
  // },
  // instructions: {
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(1)
  // }
}));

function getSteps() {
  return [
    "Set your Group’Location",
    "Your group’s name be?",
    "Almost done! Just take a minute to review our guidelines"
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div style={{ width: "70%", margin: "auto" }}>
          <h1>First, set your group’s location.</h1>
          <p>
            Meetup groups meet locally, in person and online. We'll connect you
            with people in your area, and more can join you online.
          </p>
          <TextField
            id="outlined-basic"
            label="Choose your Group location"
            variant="outlined"
          />
        </div>
      );
    case 1:
      return (
        <div style={{ width: "70%", margin: "auto" }}>
          <h1>What will your group’s name be?</h1>
          <p>
            Choose a name that will give people a clear idea of what the group
            is about. Feel free to get creative! You can edit this later if you
            change your mind.
          </p>
          <TextField
            id="outlined-basic"
            label="Your Group name?"
            variant="outlined"
          />
        </div>
      );
    case 2:
      return (
        <div style={{ width: "70%", margin: "auto" }}>
          <h1>Almost done! Just take a minute to review our guidelines</h1>
          <p>
            Meetup is all about helping people live fuller, happier lives—with
            the help of strong communities. This means that all groups should:
          </p>
          <ul>
            <li>Provide growth opportunities for members</li>
            <li>Encourage real human interactions in person or online</li>
            <li>Have a host present at all events</li>
            <li>Be transparent about the group’s intentions</li>
          </ul>
          <p>
            You can read more about all of this in our{" "}
            <strong>community guidelines.</strong>
          </p>
          <p>
            Once you submit your group, a human at Meetup will review it based
            on these guidelines and make sure it gets promoted to the right
            people.
          </p>
        </div>
      );
    default:
      return "Unknown step";
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Nav>
        <logoCont>
          <img src="./logo.svg" alt="logo-img" />
        </logoCont>
      </Nav>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography
              style={{ textAlign: "center", marginTop: "30px" }}
              className={classes.instructions}
            >
              All steps completed - you&apos;re finished. The Group is created.
            </Typography>
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{ textAlign: "right" }}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
