import '../styles/MainPage.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { useAssocList } from '../hooks/useAssocList';
import { getGenderChartData, getAgeChartData } from '../utils/getAssocChartData';
import { useTranslation } from 'react-i18next';
import ChartSkeleton from '../components/skeletons/ChartSkeleton';

export default function CaregiverMainPage() {
    const { t } = useTranslation('mainPage');
    const { assocList, loading } = useAssocList();

    const genderChartData = getGenderChartData(assocList, {maleLabel: t('caregiver.genderChart.male'), femaleLabel: t('caregiver.genderChart.female')});
    const ageChartData = getAgeChartData(assocList);
    const totalAssoc = assocList.length;

    return (
        <div className='patient-mainPage-container'>
            <h1>{ t('caregiver.title') }</h1>
            <div className='patient-mainPage-container patient-mainPage-row'>
                <div className='patient-mainPage-trackChart'>
                    { loading
                        ? <ChartSkeleton /> 
                        : (totalAssoc !== 0 
                            ? (<>
                                    <h2 className='chart-title'>{ t('caregiver.genderChartTitle') }</h2>
                                    <PieChart
                                        series={[{
                                            data: genderChartData,
                                            highlightScope: { fade: 'global', highlight: 'item' },
                                            innerRadius: 60,
                                            outerRadius: 100,
                                        }]}
                                        width={300}
                                        height={300}
                                    />
                                </>) 
                            : (
                                <div className='chart-noData'>
                                    <h2 className='chart-title'>{ t('caregiver.noAssociatesInfo') }</h2>
                                </div>
                            )
                        )
                    }
                </div>

                <div className='patient-mainPage-trackChart'>
                    { loading
                        ? <ChartSkeleton />
                        : (totalAssoc !== 0 
                            ? (<>
                                    <h2 className='chart-title'>{ t('caregiver.ageChartTitle') }</h2>
                                    <PieChart
                                        series={[{
                                            data: ageChartData,
                                            highlightScope: { fade: 'global', highlight: 'item' },
                                            innerRadius: 60,
                                            outerRadius: 100,
                                        }]}
                                        width={300}
                                        height={300}
                                    />
                                </>
                            ) : (
                                <div className='chart-noData'>
                                    <h2 className='chart-title'>{ t('caregiver.noAssociatesInfo') }</h2>
                                </div>
                            )

                        )
                    }
                </div>
            </div>
        </div>
    );
}
