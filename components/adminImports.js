import React, {useState, useEffect, useRef, forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {adminSelector} from 'store/admin/adminSlice';
import {customerSelector, setPhotos, 
    removePhoto, removeContact, setContacts,
} from 'store/customer/customerSlice';
import Layout from 'components/admin/layout'
import {loadItems, deleteItem, addItem, updateItem, loadOptions} from 'store/admin/adminActions';
import {setErrors, formSelector} from 'store/forms/formsSlice';
import {adsSelector, addFilters} from 'store/ad/adsSlice';
import {logout, addAd, loadAd, sendEmail,
    loadAds, login, loadCustomer,
    updateAd, deleteAd, categoryLocation,
    signUp, socialLogin, childOptions, 
    parentOptions, updateCustomer, updatePassword,  
    } from 'store/customer/customerActions';
import {wrapper} from 'store/store';
import Cookies from 'universal-cookie';
import AuthRoute from 'components/admin/auth';
import Swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';
import {ShowError} from 'components/alerts';
import {errorsSelector} from 'store/admin/errorsSlice';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import {GridLoader} from './loaders';
import {useRouter} from 'next/router';
import {loadersSelector, 
    startLoading, endLoading,
    statusIdle, statusSucceeded,
    statusRejected, progressStart,
    progressEnd
} from 'store/admin/loadersSlice';
import {TransForm} from './classes';
import {
    
    fetchAd, fetchItems, fetchCategoryLocation,
    fetchAds, fetchRecentAds, fetchChildOptions,
} from 'store/ad/adsActions';









export {
    updatePassword,
    sendEmail,
    removeContact,
    setContacts,
    adsSelector,
    addFilters,
    fetchAd, fetchItems, fetchCategoryLocation,
    fetchAds, fetchRecentAds, fetchChildOptions,
    TransForm,
    statusIdle, statusSucceeded,
    statusRejected, progressStart,
    progressEnd,
    loadAd,
    loadersSelector,
    startLoading,
    endLoading,
    adminSelector,
    customerSelector,
    setPhotos,
    removePhoto,
    Layout,
    loadItems,
    deleteItem,
    wrapper,
    Cookies,
    AuthRoute,
    Swal,
    unwrapResult,
    ShowError,
    errorsSelector,
    React,
    useEffect,
    useState,
    useRef,
    useDispatch,
    useSelector,
    updateItem,
    addItem,
    useForm,
    yupResolver,
    loadOptions,
    GridLoader,
    forwardRef,
    Controller,
    logout, 
    addAd,
    loadAds, 
    login, 
    loadCustomer,
    updateCustomer,
    updateAd, 
    deleteAd,
    categoryLocation,
    signUp, 
    socialLogin,
    useRouter,
    setErrors,
    formSelector,
    childOptions,
    parentOptions,
}
