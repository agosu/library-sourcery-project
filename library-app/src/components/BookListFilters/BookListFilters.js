import React from 'react';
import Chip from '@material-ui/core/Chip';
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import {categoryChips} from "./utils/constants";
import "./BookListFilters.css";
import AddFilterMenu from "./AddFilterMenu/AddFilterMenu";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
});

class BookListFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryChips: [...categoryChips],
            addFilterMenuPopper: {
                isOpen: false,
                anchorEl: null,
            }
        };

        this.handleChipDelete = this.handleChipDelete.bind(this);
        this.handleAddFilter = this.handleAddFilter.bind(this);
    }

    handleChipDelete(chipToDelete) {
        this.setState({ categoryChips: this.state.categoryChips.filter(chip => (chip !== chipToDelete)) });
    }

    handleAddFilter(e) {
        e.preventDefault();
        this.setState({
            addFilterMenuPopper: {
                ...this.state.addFilterMenuPopper,
                isOpen: !this.state.addFilterMenuPopper.isOpen,
                anchorEl: e.currentTarget,
            }
        });
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <React.Fragment>
                <div className={`category_chips ${classes.root}`}>
                    {this.state.categoryChips.map(chip => (
                        <Chip
                            label={chip.label}
                            onDelete={() => {this.handleChipDelete(chip)}}
                            key={chip.key}
                        />
                    ))}
                    <Button
                        onClick={this.handleAddFilter}
                        className={this.state.addFilterMenuPopper.isOpen ? "active-button" : ""}
                        disableElevation
                    >
                        <div id="category_chips-plus_symbol">+</div>
                        <div>Add filter</div>
                    </Button>
                    <Popper
                        open={this.state.addFilterMenuPopper.isOpen}
                        anchorEl={this.state.addFilterMenuPopper.anchorEl}
                        placement="bottom-start"
                        modifiers={{
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'viewport',
                                priority: ['right'],
                                padding: 30,
                            },
                        }}
                    >
                        <AddFilterMenu/>
                    </Popper>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BookListFilters);
