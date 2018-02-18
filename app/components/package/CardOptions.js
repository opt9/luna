import {
  APP_MODES,
  PACKAGE_GROUPS,
  COMMAND_OPTIONS
} from 'constants/AppConstants'
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'
import * as R from 'ramda'
import Checkbox from 'material-ui/Checkbox'
import React from 'react'
import PropTypes from 'prop-types'

class CardOptions extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    const { addCommandOption, clearCommandOptions } = this.props
    const opt = e.currentTarget.value
    addCommandOption(opt)
  }
  render() {
    const { group, cmdOptions } = this.props
    console.log(cmdOptions)
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {COMMAND_OPTIONS.map((option, idx) => {
            let opt = option.split('*')
            return (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={cmdOptions && R.contains(opt[0], cmdOptions)}
                    onChange={this.handleChange}
                    value={opt[0]}
                  />
                }
                label={opt[0]}
              />
            )
          })}
        </FormGroup>
        <FormHelperText>command flags</FormHelperText>
      </FormControl>
    )
  }
}

export default CardOptions