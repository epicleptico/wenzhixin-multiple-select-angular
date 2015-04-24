# wenzhixin-multiple-select-angular

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
