import angular from 'angular';
import 'angular-sanitize';

import Container from './components/container/container.component';
import Photo from './components/photo/photo.component';

export const appModule = angular.module('PhotoApp', ['ngSanitize'])
  .component('container', Container)
  .component('photo', Photo);
