import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { loadPosts, loadTrendingTags } from 'actions/post'
import { getMember, getAllMembers } from 'actions/assessmentWizard'
import PropTypes from 'prop-types'
import CommunityMemberCard from './CommunityMemberCard'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import ExpandIcon from '@material-ui/icons/ExpandMore'
import { uniqBy } from 'lodash'

import LeftColumn from '../LeftColumn'

import { filterHomePage } from '../../../actions/dashboard'

const styles = theme => ({
  columnContainer: {
    margin: 0,
    width: '100%'
  },
  columns: {
    margin: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 10,
      marginRight: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 10
    }
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'baseline'
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: theme.spacing.unit * 2
  },
  formControl: {
    marginTop: 0,
    marginRight: theme.spacing.unit * 2,
    marginBottom: 0,
    marginLeft: theme.spacing.unit * 2,
    minWidth: 85
  }
})

class Community extends React.Component {
  state = {
    country: '',
    sector: '',
    sdg: ''
  }

  componentDidMount = () => {
    this.props.loadPosts()
    this.props.loadTrendingTags()
    this.props.getAllMembers()

    const { auth, getMember } = this.props
    if (auth.user && auth.user.organization) {
      getMember(auth.user.organization.owner)
      getMember(auth.user.organization.rootMember)
      this.props.getAllMembers(auth.user.organization.owner)
      this.props.getAllMembers(auth.user.organization.rootMember)
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  getMembersWithUsername = () => {
    const { members } = this.props
    const membersWithUsername = members
      .map(
        member => member && member.manager && member.manager.username && member
      )
      .filter(member => member && member._id)
    return membersWithUsername
  }

  getCountries = () => {
    const countries = this.getMembersWithUsername()
      .map(
        m =>
          m &&
          m.countries &&
          m.countries.map(c => ({ name: c.name, _id: c._id }))
      )
      .flat(1)

    return uniqBy(countries, '_id')
  }

  getSdgs = () => {
    const sdgs = this.getMembersWithUsername()
      .map(m =>
        m.sdgs.map(s => ({
          shortName: s.shortName,
          name: s.name,
          _id: s._id
        }))
      )
      .flat(1)
    return uniqBy(sdgs, '_id')
  }

  getSectors = () => {
    const sectors = this.getMembersWithUsername()
      .map(m => m.sectors.map(s => ({ name: s.name, _id: s._id })))
      .flat(1)
    return uniqBy(sectors, '_id')
  }

  getFilteredCommunityCards = () => {
    const { members } = this.props
    const { country, sector, sdg } = this.state
    const filteredCommunityCards =
      country !== '' || sector !== '' || sdg !== ''
        ? members.filter(
            member =>
              member.countries.some(c => country === c.name) ||
              member.sectors.some(c => sector === c.name) ||
              member.sdgs.some(x => sdg === x.shortName)
          )
        : members
    return filteredCommunityCards
  }

  render() {
    const { classes, member, filterHomePage } = this.props
    const { country, sector, sdg } = this.state

    return (
      <Grid container spacing={3} className={classes.columnContainer}>
        <Grid item xs={12} sm={3}>
          <LeftColumn
            member={member}
            setSearchTags={tags => filterHomePage(tags)}
            setShowFilter={() => filterHomePage([])}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <div className={classes.columns}>
            <div className={classes.filterContainer}>
              <Typography>Filter by</Typography>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="countries">Country</InputLabel>
                <Select
                  value={country}
                  onChange={this.handleChange('country')}
                  input={<Input id="countries" />}
                  IconComponent={ExpandIcon}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    getContentAnchorEl: null
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.getCountries()
                    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
                    .map(c => (
                      <MenuItem key={c.name} value={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sdgs">Sdg</InputLabel>
                <Select
                  value={sdg}
                  onChange={this.handleChange('sdg')}
                  input={<Input id="sdgs" />}
                  IconComponent={ExpandIcon}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    getContentAnchorEl: null
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.getSdgs()
                    .sort((a, b) =>
                      a.shortName.localeCompare(b.shortName, 'en', {
                        numeric: true
                      })
                    )
                    .map(s => (
                      <MenuItem key={s.name} value={s.shortName}>
                        {s.shortName} {s.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sectors">Sector</InputLabel>
                <Select
                  value={sector}
                  onChange={this.handleChange('sector')}
                  input={<Input id="sectors" />}
                  IconComponent={ExpandIcon}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    getContentAnchorEl: null
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.getSectors()
                    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
                    .map(s => (
                      <MenuItem key={s.name} value={s.name}>
                        {s.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.cards}>
              {this.getFilteredCommunityCards().map(
                member =>
                  member &&
                  member.manager &&
                  member.manager.username && (
                    <CommunityMemberCard key={member._id} company={member} />
                  )
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}
Community.defaultProps = {
  loadPosts: () => {},
  getMember: () => {},
  getAllMembers: () => {}
}

Community.propTypes = {
  loadPosts: PropTypes.func,
  getMember: PropTypes.func,
  getAllMembers: PropTypes.func
}

const CommunityWithStyles = withStyles(styles)(Community)

export default connect(
  state => ({
    posts: state.posts,
    tags: state.tags,
    member: state.assessmentWizard,
    members: state.assessmentWizard.members,
    auth: state.auth
  }),
  dispatch => ({
    loadPosts: loadPosts(dispatch),
    loadTrendingTags: loadTrendingTags(dispatch),
    getMember: getMember(dispatch),
    getAllMembers: getAllMembers(dispatch),
    filterHomePage: filterHomePage(dispatch)
  })
)(CommunityWithStyles)
