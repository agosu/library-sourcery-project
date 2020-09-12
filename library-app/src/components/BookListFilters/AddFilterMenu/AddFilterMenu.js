import React from 'react';
import Paper from "@material-ui/core/Paper";
import {filterTypes} from "./utils/constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import Scrollbars from "react-custom-scrollbars";
import Chip from '@material-ui/core/Chip';
import "./AddFilterMenu.css";

function OverviewItem({ filterTypeName, selectedFilters, handleFilterChipDelete }) {
    function filterCompare(a,b) {
        if (a.label > b.label)
            return 1;
        else if (a === b)
            return 0;
        else
            return -1;
    }

    return (
        <div id={`filter_menu-overview-${filterTypeName}`} className="filter_menu-overview-filter_type">
            <span className="filter_menu-overview-text">Category</span>
            <br/>
            <div id={`filter_menu-overview-${filterTypeName}-chips`}
                 className="filter_menu-overview-chips">
                {selectedFilters.sort(filterCompare).map(filter => {
                    return (
                        <React.Fragment key={filter.label}>
                            <Chip
                                onDelete={() => {
                                    handleFilterChipDelete(filterTypeName, filter)
                                }}
                                label={filter.label}
                            />
                            <br/>
                        </React.Fragment>

                    );
                })}
            </div>
        </div>
    );
}

class AddFilterMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFilterType: filterTypes[0],
            selectedFilters: {
                category: [
                    filterTypes[0].filters[0],
                ],
                status: [

                ],
                office: [

                ],
                author: [

                ],
            },
        };

        this.getSelectedCountText = this.getSelectedCountText.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFilterChipDelete = this.handleFilterChipDelete.bind(this);
        this.handleFilterTypeSelection = this.handleFilterTypeSelection.bind(this);
        this.filterIsSelected = this.filterIsSelected.bind(this);
    }

    getSelectedCountText() {
        let count = 0;

        for (let prop in this.state.selectedFilters) {
            if (!this.state.selectedFilters.hasOwnProperty(prop) && !this.state.selectedFilters[prop].isArray())
                continue;

            count += this.state.selectedFilters[prop].length;
        }

        if (count == 0) {
            return "NO FILTERS SELECTED";
        }
        else {
            return `${count} SELECTED`;
        }
    }


    handleTextFieldChange(e) {
        let keyword = e.target.value.toLowerCase();
        let selectedFilterType = { ...filterTypes[this.state.selectedFilterType.index] };

        selectedFilterType.filters = selectedFilterType.filters.filter(filter => {
            return filter.label.toLowerCase().startsWith(keyword);
        });

        this.setState({ selectedFilterType });
    }

    handleCheckboxChange(filterTypeName, filterChanged) {
        let alteredState = this.state;

        if (alteredState.selectedFilters[filterTypeName].includes(filterChanged)) {
            alteredState.selectedFilters[filterTypeName] = alteredState.selectedFilters[filterTypeName].filter(filter => (filter !== filterChanged));
        }
        else {
            alteredState.selectedFilters[filterTypeName].push(filterChanged);
        }

        this.setState(alteredState);
    }

    handleFilterChipDelete(filterTypeName, filterToDelete) {
        let alteredState = this.state;
        alteredState.selectedFilters[filterTypeName] = alteredState.selectedFilters[filterTypeName].filter(filter => (filter !== filterToDelete));
        this.setState(alteredState);
    }

    handleFilterTypeSelection(filterType) {
        this.setState({ selectedFilterType: filterType });
    }


    filterIsSelected(filterTypeName, filterToCheck) {
        let isSelected = false;

        this.state.selectedFilters[filterTypeName].forEach(filter => {
            if (filterToCheck.label == filter.label)
                isSelected = true;
        });

        return isSelected;
    }

    render() {
        return (
            <Paper id="filter_menu">
                {/*-------------FILTER TYPE SELECTION--------------*/}
                <div id="filter_menu-type_selection">
                    <List>
                        {filterTypes.map(filterType => {
                            return (
                                <React.Fragment key={filterType.filterTypeName}>
                                    <div className="filter_menu-type_selection-list_item-wrapper">
                                        <ListItem
                                            button
                                            className={filterType === this.state.selectedFilterType ? "MuiListItem-root--selected" : ""}
                                            onClick={() => {this.handleFilterTypeSelection(filterType)}}
                                        >
                                            <ListItemText
                                                disableTypography
                                                primary={filterType.label}
                                            />
                                            {this.state.selectedFilters[filterType.filterTypeName].length ? (
                                                <ListItemIcon>
                                                    <div>
                                                        <span>{this.state.selectedFilters[filterType.filterTypeName].length}</span>
                                                    </div>
                                                </ListItemIcon>
                                            ) : null}
                                        </ListItem>
                                        {filterType === this.state.selectedFilterType ? <div id="filter_menu-type_selection-list_item-active_line"/> : null}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </div>
                {/*-------------FILTER VALUE SELECTION--------------*/}
                <div id="filter_menu-value_selection">
                    <TextField
                        placeholder="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}
                        onChange={this.handleTextFieldChange}
                    />
                    <div id="filter_menu-value_selection-values">
                        <Scrollbars style={{width: 250, height: 195}}>
                            <List>
                                {
                                    this.state.selectedFilterType.filters.map(filter => {
                                        return (
                                            <ListItem
                                                button
                                                onClick={() => {this.handleCheckboxChange(this.state.selectedFilterType.filterTypeName, filter)}}
                                                key={filter.label}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        checked={this.filterIsSelected(this.state.selectedFilterType.filterTypeName, filter)}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    disableTypography
                                                    primary={filter.label}
                                                />
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                        </Scrollbars>
                    </div>
                </div>
                {/*-------------FILTER SELECTION OVERVIEW--------------*/}
                <div id="filter_menu-overview">
                    <div id="filter_menu-overview-selected_count">
                        <span id="filter_menu-overview-selected_count-text" className="filter_menu-overview-text">{this.getSelectedCountText()}</span>
                    </div>
                    <Scrollbars style={{width: 250, height: 199}}>
                        <div id="filter_menu-overview-content">
                            {this.state.selectedFilters.category.length ? (
                                <OverviewItem
                                    filterTypeName="category"
                                    selectedFilters={this.state.selectedFilters["category"]}
                                    handleFilterChipDelete={this.handleFilterChipDelete}
                                />)
                                : null}
                            {this.state.selectedFilters.status.length ? (
                                <OverviewItem
                                    filterTypeName="status"
                                    selectedFilters={this.state.selectedFilters["status"]}
                                    handleFilterChipDelete={this.handleFilterChipDelete}
                                />
                            ): null}
                            {this.state.selectedFilters.office.length ? (
                                <OverviewItem
                                    filterTypeName="office"
                                    selectedFilters={this.state.selectedFilters["office"]}
                                    handleFilterChipDelete={this.handleFilterChipDelete}
                                />
                            ) : null}
                            {this.state.selectedFilters.author.length ? (
                                <OverviewItem
                                    filterTypeName="author"
                                    selectedFilters={this.state.selectedFilters["author"]}
                                    handleFilterChipDelete={this.handleFilterChipDelete}
                                />
                            ) : null}
                            <br/>
                        </div>
                    </Scrollbars>
                </div>
                {/*-------------APPLY AND CANCEL BUTTONS--------------*/}
                <div id="filter_menu-control">
                        <Button
                            variant="text"
                            disableElevation
                            id="filter_menu-control-cancel"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            id="filter_menu-control-apply"
                        >
                            Apply
                        </Button>
                </div>
            </Paper>
        );
    }
}



export default AddFilterMenu;
