import React from "react";
import { Grid, GridColumn, GridRow, Header, Icon, Image, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import "./UserInfoComponent.css";
import { auth } from "../../../../server/firebase"; // Import the named export

const UserInfoComponent = (props) => {

  const getDropDownOptions = () => {
    return [
      {
        key: "signout",
        text: <span onClick={signOut} className="signout">Sign Out</span>
      }
    ];
  };

  const signOut = () => {
    auth.signOut() // Use the named import `auth`
      .then(() => console.log("User Signed Out"));
  };

  if (props.user) {
    return (
      <Grid>
        <GridColumn>
          <GridRow className="userinfo_grid_row">
            <Header inverted as="h2">
              <Icon name="slack" />
              <Header.Content>Slack</Header.Content>
            </Header>
            <Header inverted as="h4" className="userinfo_display_name">
              <Dropdown trigger={
                <span>
                  <Image src={props.user.photoURL} avatar />
                  {props.user.displayName}
                </span>
              }
                options={getDropDownOptions()}
              />
            </Header>
          </GridRow>
        </GridColumn>
      </Grid>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser // Ensure this matches your Redux state structure
  };
};

export default connect(mapStateToProps)(UserInfoComponent);
