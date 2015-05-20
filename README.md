[![Stories in Ready](https://badge.waffle.io/epicleptico/wenzhixin-multiple-select-angular.png?label=ready&title=Ready)](https://waffle.io/epicleptico/wenzhixin-multiple-select-angular)
# wenzhixin-multiple-select-angular

[![Join the chat at https://gitter.im/epicleptico/wenzhixin-multiple-select-angular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/epicleptico/wenzhixin-multiple-select-angular?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


This is just an angular implementation for [wenzhixin/multiple-select](https://github.com/wenzhixin/multiple-select) repository usage


Quick example
-------------

```HTML
 <select id="multiSelectCountries1" class="form-control"
                                    ng-model="countries1"
                                    ng-options="item as item.name for item in countries track by item.id"
                                    ng-multi-select
                                    ng-multi-select-track="countries"
                                    multiple="multiple"
                                    >
                            </select>
```

Example
-------

[plunkr](http://plnkr.co/edit/e9vuq5yW5to2Em0EX3Fa?p=preview) - Updated to v.0.1.6
