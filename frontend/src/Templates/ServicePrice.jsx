import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

class ServicePrice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: this.props.category,
            subCategory: this.props.subCategory,
            categoryData: this.getCategory(this.props.category, this.props.subCategory),
            loaded: false
        }
    }

    getCategory = async (categoryId, subCategoryId) => {
        const res = await axios.get(`${window.env.REACT_APP_BACKEND_API}/categories/${categoryId}/${subCategoryId}`)
        this.setState({ categoryData: res.data, loaded: true });
    }

    componentDidUpdate(prevProps) {
        if (this.props.subCategory !== prevProps.subCategory) {
            this.getCategory(this.props.category, this.props.subCategory)
        }
    }

    render() {
        return (
            this.state.loaded ?
                <div>
                    <Breadcrumbs aria-label='breadcrumb'>
                        <Link color='inherit' href='/'>
                            pricing model
                        </Link>
                        <Link color='inherit'>
                            {this.state.categoryData[0].category_title}
                        </Link>
                        <Typography color='textPrimary'>{this.state.categoryData[0].sub_category_name}</Typography>
                    </Breadcrumbs>
                    <span>
                        <h1>This is where some information about AWS services will go.</h1>
                        {this.state.categoryData[0].pricing_model}
                    </span>
                </div> : <div><CircularProgress /></div>
        )
    }
}

ServicePrice.propTypes = {
    category: Number,
    subCategory: Number,
    categoryData: Object,
    loaded: Boolean
}

export default ServicePrice
